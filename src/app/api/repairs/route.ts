import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { sendEmail, emailTemplates } from '@/lib/email';
// import { sendTelegramNotification } from '@/lib/telegram';

const createRepairSchema = z.object({
  deviceType: z.string().min(1, 'Device type is required'),
  deviceModel: z.string().optional(),
  issueDescription: z.string().min(10, 'Issue description must be at least 10 characters'),
  isEasyMailIn: z.boolean().default(false)
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
      isEasyMailIn
    } = createRepairSchema.parse(body);

    // Generate repair number
    const repairCount = await prisma.repair.count();
    const repairNumber = `REP-${new Date().getFullYear()}-${String(repairCount + 1).padStart(3, '0')}`;

    // Create repair
    const repair = await prisma.repair.create({
      data: {
        repairNumber,
        userId: (session.user as any)?.id,
        deviceType,
        deviceModel: deviceModel || '',
        issueDescription,
        status: 'RECEIVED',
        isEasyMailIn
      }
    });

    // Send email notification to customer
    try {
      const emailTemplate = emailTemplates.repairUpdate(
        repairNumber,
        'RECEIVED',
        'sq'
      );
      
      await sendEmail({
        to: session.user.email!,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Don't fail the entire request if email fails
    }

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
        timeline: {
          orderBy: {
            createdAt: 'desc'
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