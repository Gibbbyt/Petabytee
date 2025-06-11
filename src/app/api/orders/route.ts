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
          items: {
            include: {
              product: true,
            }
          },
          pcConfig: true,
          ps5Config: true,
          invoice: true,
          timeline: {
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
    const shipping = 0; // Free shipping for now
    const total = subtotal + tax + shipping;

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
          status: 'PENDING',
          subtotal,
          tax,
          shipping,
          total,
          shippingAddress: JSON.stringify(shippingAddress),
          notes,
          pcConfigId: items.find(item => item.pcConfigId)?.pcConfigId || null,
          ps5ConfigId: items.find(item => item.ps5ConfigId)?.ps5ConfigId || null,
        }
      });

      // Create order items
      for (const item of items) {
        if (item.productId) {
          await tx.orderItem.create({
            data: {
              orderId: newOrder.id,
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            }
          });
        }
      }

      // Create initial timeline entry
      await tx.timeline.create({
        data: {
          entityType: 'ORDER',
          entityId: newOrder.id,
          title: language === 'sq' ? 'Porosi e Krijuar' : 'Order Created',
          titleAl: 'Porosi e Krijuar',
          description: language === 'sq' 
            ? 'Porositë tuaj është regjistruar me sukses dhe është duke u procesuar.'
            : 'Your order has been successfully registered and is being processed.',
          descriptionAl: 'Porositë tuaj është regjistruar me sukses dhe është duke u procesuar.',
          icon: 'clock',
        }
      });

      // Create invoice
      await tx.invoice.create({
        data: {
          invoiceNumber: `INV-${orderNumber}`,
          orderId: newOrder.id,
          amount: total,
          status: 'DRAFT',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        }
      });

      return newOrder;
    });

    // Send email notification to customer
    try {
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
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Don't fail the order creation if email fails
    }

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
        items: {
          include: {
            product: true,
          }
        },
        pcConfig: true,
        ps5Config: true,
        invoice: true,
        timeline: {
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