import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { sendEmail, emailTemplates } from '@/lib/email';
import { sendTelegramNotification } from '@/lib/telegram';

const createRepairSchema = z.object({
  deviceType: z.string().min(1, 'Device type is required'),
  deviceModel: z.string().optional(),
  issueDescription: z.string().min(10, 'Issue description must be at least 10 characters'),
  urgency: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  isEasyMailIn: z.boolean().default(false),
  estimatedValue: z.number().optional(),
  shippingAddress: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string().default('Kosovo'),
  }).optional(),
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
    const isEasyMailIn = searchParams.get('isEasyMailIn');
    const userId = session.user.role === 'CLIENT' ? session.user.id : searchParams.get('userId');

    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (userId) {
      where.userId = userId;
    }
    
    if (status) {
      where.status = status;
    }
    
    if (isEasyMailIn !== null) {
      where.isEasyMailIn = isEasyMailIn === 'true';
    }

    const [repairs, total] = await Promise.all([
      prisma.repair.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          },
          timelineEntries: {
            where: {
              isVisible: true
            },
            orderBy: {
              createdAt: 'desc'
            }
          },
          assignedTechnician: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit,
      }),
      prisma.repair.count({ where })
    ]);

    return NextResponse.json({
      repairs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get repairs error:', error);
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
    const { 
      deviceType, 
      deviceModel, 
      issueDescription, 
      urgency, 
      isEasyMailIn, 
      estimatedValue,
      shippingAddress,
      language 
    } = createRepairSchema.parse(body);

    // Generate repair number
    const repairCount = await prisma.repair.count();
    const repairNumber = `PR-${new Date().getFullYear()}-${String(repairCount + 1).padStart(3, '0')}`;

    // Create repair with transaction
    const repair = await prisma.$transaction(async (tx) => {
      // Create repair
      const newRepair = await tx.repair.create({
        data: {
          repairNumber,
          userId: session.user.id,
          deviceType,
          deviceModel,
          issueDescription,
          urgency,
          status: 'PENDING',
          isEasyMailIn,
          estimatedValue,
          shippingAddress: shippingAddress ? JSON.stringify(shippingAddress) : null,
          language,
        }
      });

      // Create initial timeline entry
      await tx.timelineEntry.create({
        data: {
          repairId: newRepair.id,
          status: 'PENDING',
          title: language === 'sq' ? 'Kërkesa e Riparimit e Krijuar' : 'Repair Request Created',
          description: language === 'sq' 
            ? 'Kërkesa juaj për riparim është regjistruar me sukses dhe është duke u shqyrtuar.'
            : 'Your repair request has been successfully registered and is being reviewed.',
          isVisible: true,
          createdBy: session.user.id,
        }
      });

      // If EasyMail-In, create shipping timeline entry
      if (isEasyMailIn) {
        await tx.timelineEntry.create({
          data: {
            repairId: newRepair.id,
            status: 'SHIPPING_ARRANGED',
            title: language === 'sq' ? 'Transporti EasyMail-In' : 'EasyMail-In Shipping',
            description: language === 'sq' 
              ? 'Kuti transporti do të dërgohet në adresën tuaj brenda 24 orëve.'
              : 'Shipping box will be sent to your address within 24 hours.',
            isVisible: true,
            createdBy: session.user.id,
          }
        });
      }

      return newRepair;
    });

    // Send email notification to customer
    const emailTemplate = emailTemplates.repairConfirmation(
      session.user.name!,
      repairNumber,
      deviceType,
      isEasyMailIn,
      language
    );
    
    await sendEmail({
      to: session.user.email!,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    });

    // Send Telegram notification to admins
    await sendTelegramNotification({
      type: 'NEW_REPAIR',
      data: {
        repairNumber,
        customerName: session.user.name,
        deviceType,
        urgency,
        isEasyMailIn,
        estimatedValue: estimatedValue || 0,
      }
    });

    // Fetch complete repair with relations
    const completeRepair = await prisma.repair.findUnique({
      where: { id: repair.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        timelineEntries: {
          where: {
            isVisible: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        assignedTechnician: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    return NextResponse.json({
      message: 'Repair request created successfully',
      repair: completeRepair
    }, { status: 201 });

  } catch (error) {
    console.error('Create repair error:', error);
    
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