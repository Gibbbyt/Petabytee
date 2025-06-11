import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const color = searchParams.get('color');

    const where: any = {};

    if (type) {
      where.componentType = type.toUpperCase();
    }

    if (color) {
      where.colorHex = color;
    }

    const components = await prisma.pS5Component.findMany({
      where,
      include: {
        product: {
          select: {
            id: true,
            name: true,
            nameAl: true,
            description: true,
            descriptionAl: true,
            price: true,
            image: true,
            stock: true,
            category: true
          }
        }
      },
      orderBy: {
        product: {
          price: 'asc'
        }
      }
    });

    return NextResponse.json({ components });

  } catch (error) {
    console.error('Get PS5 components error:', error);
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
    if (!session || userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { productId, componentType, colorHex } = body;

    const component = await prisma.pS5Component.create({
      data: {
        productId,
        componentType: componentType.toUpperCase(),
        colorHex
      },
      include: {
        product: true
      }
    });

    return NextResponse.json({
      message: 'PS5 component created successfully',
      component
    }, { status: 201 });

  } catch (error) {
    console.error('Create PS5 component error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}