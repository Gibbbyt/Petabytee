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
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'pc' or 'ps5'
    const userId = session.user.role === 'ADMIN' ? searchParams.get('userId') : session.user.id;
    const isPublic = searchParams.get('public') === 'true';

    if (type === 'pc') {
      const where: any = {};
      
      if (isPublic) {
        where.isPublic = true;
      } else if (userId) {
        where.userId = userId;
      }

      const configs = await prisma.pcConfiguration.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return NextResponse.json({
        configurations: configs.map(config => ({
          id: config.id,
          name: config.name,
          nameEn: config.nameEn,
          buildType: config.buildType,
          components: config.components,
          totalPrice: config.totalPrice,
          notes: config.notes,
          isPublic: config.isPublic,
          user: config.user,
          createdAt: config.createdAt,
          updatedAt: config.updatedAt
        }))
      });
    }

    if (type === 'ps5') {
      const where: any = {};
      
      if (isPublic) {
        where.isPublic = true;
      } else if (userId) {
        where.userId = userId;
      }

      const configs = await prisma.ps5Configuration.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return NextResponse.json({
        configurations: configs.map(config => ({
          id: config.id,
          name: config.name,
          nameEn: config.nameEn,
          components: config.components,
          colors: config.colors,
          customizations: config.customizations,
          totalPrice: config.totalPrice,
          notes: config.notes,
          isPublic: config.isPublic,
          user: config.user,
          createdAt: config.createdAt,
          updatedAt: config.updatedAt
        }))
      });
    }

    return NextResponse.json({ error: 'Invalid configuration type' }, { status: 400 });

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
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'pc' or 'ps5'

    if (!type || !['pc', 'ps5'].includes(type)) {
      return NextResponse.json({ error: 'Invalid configuration type' }, { status: 400 });
    }

    const body = await request.json();

    if (type === 'pc') {
      const configData = createPCConfigSchema.parse(body);

      const configuration = await prisma.pcConfiguration.create({
        data: {
          ...configData,
          userId: session.user.id,
          components: configData.components as any,
        }
      });

      return NextResponse.json({
        message: 'PC configuration saved successfully',
        configuration
      }, { status: 201 });
    }

    if (type === 'ps5') {
      const configData = createPS5ConfigSchema.parse(body);

      const configuration = await prisma.ps5Configuration.create({
        data: {
          ...configData,
          userId: session.user.id,
          components: configData.components as any,
          colors: configData.colors as any,
          customizations: configData.customizations as any,
        }
      });

      return NextResponse.json({
        message: 'PS5 configuration saved successfully',
        configuration
      }, { status: 201 });
    }

  } catch (error) {
    console.error('Create configuration error:', error);
    
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

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const configId = searchParams.get('id');

    if (!configId) {
      return NextResponse.json({ error: 'Configuration ID is required' }, { status: 400 });
    }

    const body = await request.json();

    if (type === 'pc') {
      const configData = createPCConfigSchema.partial().parse(body);

      const configuration = await prisma.pcConfiguration.update({
        where: { 
          id: configId,
          userId: session.user.id // Ensure user can only update their own configs
        },
        data: {
          ...configData,
          components: configData.components as any,
        }
      });

      return NextResponse.json({
        message: 'PC configuration updated successfully',
        configuration
      });
    }

    if (type === 'ps5') {
      const configData = createPS5ConfigSchema.partial().parse(body);

      const configuration = await prisma.ps5Configuration.update({
        where: { 
          id: configId,
          userId: session.user.id
        },
        data: {
          ...configData,
          components: configData.components as any,
          colors: configData.colors as any,
          customizations: configData.customizations as any,
        }
      });

      return NextResponse.json({
        message: 'PS5 configuration updated successfully',
        configuration
      });
    }

    return NextResponse.json({ error: 'Invalid configuration type' }, { status: 400 });

  } catch (error) {
    console.error('Update configuration error:', error);
    
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

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const configId = searchParams.get('id');

    if (!configId) {
      return NextResponse.json({ error: 'Configuration ID is required' }, { status: 400 });
    }

    if (type === 'pc') {
      await prisma.pcConfiguration.delete({
        where: { 
          id: configId,
          userId: session.user.id
        }
      });
    } else if (type === 'ps5') {
      await prisma.ps5Configuration.delete({
        where: { 
          id: configId,
          userId: session.user.id
        }
      });
    } else {
      return NextResponse.json({ error: 'Invalid configuration type' }, { status: 400 });
    }

    return NextResponse.json({
      message: 'Configuration deleted successfully'
    });

  } catch (error) {
    console.error('Delete configuration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}