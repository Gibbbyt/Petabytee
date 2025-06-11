import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

const createPCConfigSchema = z.object({
  name: z.string().min(1, 'Configuration name is required'),
  nameEn: z.string().optional(),
  buildType: z.string().min(1, 'Build type is required'),
  components: z.object({
    cpu: z.string().optional(),
    gpu: z.string().optional(),
    ram: z.string().optional(),
    storage: z.string().optional(),
    motherboard: z.string().optional(),
    psu: z.string().optional(),
    case: z.string().optional(),
    cooling: z.string().optional()
  }),
  totalPrice: z.number().min(0),
  notes: z.string().optional(),
  isPublic: z.boolean().default(false)
});

const createPS5ConfigSchema = z.object({
  name: z.string().min(1, 'Configuration name is required'),
  nameEn: z.string().optional(),
  components: z.object({
    faceplate: z.string().optional(),
    buttons: z.string().optional(),
    sticks: z.string().optional(),
    triggers: z.string().optional(),
    touchpad: z.string().optional()
  }),
  colors: z.object({
    primary: z.string().optional(),
    secondary: z.string().optional(),
    accent: z.string().optional()
  }),
  customizations: z.record(z.any()).optional(),
  totalPrice: z.number().min(0),
  notes: z.string().optional(),
  isPublic: z.boolean().default(false)
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'pc' or 'ps5'
    const userId = searchParams.get('userId');
    const configId = searchParams.get('configId');

    // Check authentication
    const session = await getServerSession(authOptions);
    
    const userRole = (session?.user as any)?.role;
    if (!session || (userRole !== 'ADMIN' && userRole !== 'CLIENT')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // If configId is provided, return specific configuration
    if (configId) {
      if (type === 'pc') {
        const config = await prisma.pCConfig.findUnique({
          where: { id: configId },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            items: {
              include: {
                component: {
                  include: {
                    product: true
                  }
                }
              }
            }
          }
        });

        if (!config) {
          return NextResponse.json({ error: 'Configuration not found' }, { status: 404 });
        }

        return NextResponse.json({ configuration: config });
      } else if (type === 'ps5') {
        const config = await prisma.pS5Config.findUnique({
          where: { id: configId },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            items: {
              include: {
                component: {
                  include: {
                    product: true
                  }
                }
              }
            }
          }
        });

        if (!config) {
          return NextResponse.json({ error: 'Configuration not found' }, { status: 404 });
        }

        return NextResponse.json({ configuration: config });
      }
    }

    // Build where clause for filtering
    const where: any = {};
    if (userId) {
      where.userId = userId;
    }

    if (type === 'pc') {
      const configs = await prisma.pCConfig.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          items: {
            include: {
              component: {
                include: {
                  product: true
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return NextResponse.json({ configurations: configs });
    } else if (type === 'ps5') {
      const configs = await prisma.pS5Config.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          items: {
            include: {
              component: {
                include: {
                  product: true
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return NextResponse.json({ configurations: configs });
    }

    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });

  } catch (error) {
    console.error('Get configurations error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    const userRole = (session?.user as any)?.role;
    if (!session || (userRole !== 'ADMIN' && userRole !== 'CLIENT')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type, name, components, totalPrice } = await request.json();
    const userId = (session.user as any)?.id;

    if (type === 'pc') {
      const configuration = await prisma.pCConfig.create({
        data: {
          userId,
          name,
          totalPrice,
          status: 'SAVED',
          items: {
            create: components.map((comp: any) => ({
              componentId: comp.componentId,
              quantity: comp.quantity || 1,
              price: comp.price
            }))
          }
        },
        include: {
          items: {
            include: {
              component: {
                include: {
                  product: true
                }
              }
            }
          }
        }
      });

      return NextResponse.json({ configuration });
    } else if (type === 'ps5') {
      const configuration = await prisma.pS5Config.create({
        data: {
          userId,
          name,
          totalPrice,
          status: 'SAVED',
          items: {
            create: components.map((comp: any) => ({
              componentId: comp.componentId,
              customColor: comp.customColor,
              price: comp.price
            }))
          }
        },
        include: {
          items: {
            include: {
              component: {
                include: {
                  product: true
                }
              }
            }
          }
        }
      });

      return NextResponse.json({ configuration });
    }

    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });

  } catch (error) {
    console.error('Create configuration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    const userRole = (session?.user as any)?.role;
    if (!session || (userRole !== 'ADMIN' && userRole !== 'CLIENT')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { configId, type, name, components, totalPrice } = await request.json();

    if (type === 'pc') {
      const configuration = await prisma.pCConfig.update({
        where: { id: configId },
        data: {
          name,
          totalPrice,
          updatedAt: new Date(),
          items: {
            deleteMany: {},
            create: components.map((comp: any) => ({
              componentId: comp.componentId,
              quantity: comp.quantity || 1,
              price: comp.price
            }))
          }
        },
        include: {
          items: {
            include: {
              component: {
                include: {
                  product: true
                }
              }
            }
          }
        }
      });

      return NextResponse.json({ configuration });
    } else if (type === 'ps5') {
      const configuration = await prisma.pS5Config.update({
        where: { id: configId },
        data: {
          name,
          totalPrice,
          updatedAt: new Date(),
          items: {
            deleteMany: {},
            create: components.map((comp: any) => ({
              componentId: comp.componentId,
              customColor: comp.customColor,
              price: comp.price
            }))
          }
        },
        include: {
          items: {
            include: {
              component: {
                include: {
                  product: true
                }
              }
            }
          }
        }
      });

      return NextResponse.json({ configuration });
    }

    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });

  } catch (error) {
    console.error('Update configuration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    const userRole = (session?.user as any)?.role;
    if (!session || (userRole !== 'ADMIN' && userRole !== 'CLIENT')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const configId = searchParams.get('configId');
    const type = searchParams.get('type');

    if (!configId || !type) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    if (type === 'pc') {
      await prisma.pCConfig.delete({
        where: { id: configId }
      });
    } else if (type === 'ps5') {
      await prisma.pS5Config.delete({
        where: { id: configId }
      });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Delete configuration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}