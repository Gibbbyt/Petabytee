import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const inStock = searchParams.get('inStock');

    const where: any = {};

    if (type) {
      where.componentType = type.toUpperCase();
    }

    if (category) {
      where.product = {
        category: category.toUpperCase()
      };
    }

    if (minPrice || maxPrice) {
      where.product = {
        ...where.product,
        price: {
          ...(minPrice && { gte: parseFloat(minPrice) }),
          ...(maxPrice && { lte: parseFloat(maxPrice) })
        }
      };
    }

    if (inStock === 'true') {
      where.product = {
        ...where.product,
        stock: { gt: 0 }
      };
    }

    const components = await prisma.pCComponent.findMany({
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

    // Parse specifications from JSON string for each component
    const componentsWithSpecs = components.map(component => ({
      ...component,
      specifications: component.specifications ? JSON.parse(component.specifications) : {}
    }));

    return NextResponse.json({ components: componentsWithSpecs });

  } catch (error) {
    console.error('Get PC components error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      productId,
      componentType,
      specifications
    } = body;

    const component = await prisma.pCComponent.create({
      data: {
        productId,
        componentType: componentType.toUpperCase(),
        specifications: JSON.stringify(specifications || {})
      },
      include: {
        product: true
      }
    });

    return NextResponse.json({
      message: 'Component created successfully',
      component
    }, { status: 201 });

  } catch (error) {
    console.error('Create PC component error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}