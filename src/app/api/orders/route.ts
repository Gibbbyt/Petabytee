import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { sendEmail, emailTemplates } from '@/lib/email';
// import { sendTelegramNotification } from '@/lib/telegram';

const createOrderSchema = z.object({
  type: z.enum(['PC_BUILD', 'PS5_CONTROLLER', 'PRODUCT', 'GIFT_CARD']),
  items: z.array(z.object({
    productId: z.string().optional(),
    pcConfigId: z.string().optional(),
    ps5ConfigId: z.string().optional(),
    quantity: z.number().min(1),
    price: z.number().min(0),
    customizations: z.record(z.any()).optional(),
  })),
  shippingAddress: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string().default('Kosovo'),
  }),
  notes: z.string().optional(),
  language: z.enum(['sq', 'en']).default('sq'),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const userRole = (session?.user as any)?.role;
    const userId = userRole === 'CLIENT' ? (session.user as any)?.id : searchParams.get('userId');

    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (userId) {
      where.userId = userId;
    }
    
    if (status) {
      where.status = status;
    }
    
    if (type) {
      where.type = type;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          },
          orderItems: {
            include: {
              product: true,
              pcConfiguration: true,
              ps5Configuration: true,
            }
          },
          invoice: true,
          timelineEntries: {
            orderBy: {
              createdAt: 'desc'
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit,
      }),
      prisma.order.count({ where })
    ]);

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { type, items, shippingAddress, notes, language } = createOrderSchema.parse(body);

    // Calculate total
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.2; // 20% VAT
    const total = subtotal + tax;

    // Generate order number
    const orderCount = await prisma.order.count();
    const orderNumber = `PB-${new Date().getFullYear()}-${String(orderCount + 1).padStart(3, '0')}`;

    // Create order with transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: (session.user as any)?.id,
          type,
          status: 'PENDING',
          subtotal,
          tax,
          total,
          shippingAddress: JSON.stringify(shippingAddress),
          notes,
          language,
        }
      });

      // Create order items
      for (const item of items) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            pcConfigurationId: item.pcConfigId,
            ps5ConfigurationId: item.ps5ConfigId,
            quantity: item.quantity,
            price: item.price,
            customizations: item.customizations ? JSON.stringify(item.customizations) : null,
          }
        });
      }

      // Create initial timeline entry
      await tx.timelineEntry.create({
        data: {
          orderId: newOrder.id,
          status: 'PENDING',
          title: language === 'sq' ? 'Porosi e Krijuar' : 'Order Created',
          description: language === 'sq' 
            ? 'Porositë tuaj është regjistruar me sukses dhe është duke u procesuar.'
            : 'Your order has been successfully registered and is being processed.',
          isVisible: true,
          createdBy: (session.user as any)?.id,
        }
      });

      // Create invoice
      await tx.invoice.create({
        data: {
          orderId: newOrder.id,
          invoiceNumber: `INV-${orderNumber}`,
          subtotal,
          tax,
          total,
          status: 'PENDING',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        }
      });

      return newOrder;
    });

    // Send email notification to customer
    const emailTemplate = emailTemplates.orderConfirmation(
      orderNumber,
      total,
      language
    );
    
    await sendEmail({
      to: session.user.email || shippingAddress.email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    });

    // Send Telegram notification to admins
    // await sendTelegramNotification({
    //   message: `🛒 New Order Received!\n\nOrder Number: #${orderNumber}\nCustomer: ${session.user.name || shippingAddress.name}\nTotal: €${total.toFixed(2)}`
    // });

    // Fetch complete order with relations
    const completeOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        orderItems: {
          include: {
            product: true,
            pcConfiguration: true,
            ps5Configuration: true,
          }
        },
        invoice: true,
        timelineEntries: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    return NextResponse.json({
      message: 'Order created successfully',
      order: completeOrder
    }, { status: 201 });

  } catch (error) {
    console.error('Create order error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}