import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const buildType = searchParams.get('buildType');

    let where: any = {
      isActive: true,
      inStock: true
    };

    if (category) {
      where.category = category.toUpperCase();
    }

    if (buildType) {
      where.compatibleBuilds = {
        contains: buildType
      };
    }

    const components = await prisma.pcComponent.findMany({
      where,
      orderBy: {
        price: 'asc'
      }
    });

    return NextResponse.json({
      components: components.map(component => ({
        id: component.id,
        name: component.name,
        nameEn: component.nameEn,
        description: component.description,
        descriptionEn: component.descriptionEn,
        price: component.price,
        specs: component.specs,
        specsEn: component.specsEn,
        compatibility: component.compatibility,
        inStock: component.inStock,
        category: component.category,
        image: component.image
      }))
    });

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
      name,
      nameEn,
      description,
      descriptionEn,
      category,
      price,
      specs,
      specsEn,
      compatibility,
      compatibleBuilds,
      image
    } = body;

    const component = await prisma.pcComponent.create({
      data: {
        name,
        nameEn,
        description,
        descriptionEn,
        category: category.toUpperCase(),
        price: parseFloat(price),
        specs: specs || [],
        specsEn: specsEn || [],
        compatibility: compatibility || [],
        compatibleBuilds: compatibleBuilds || [],
        image,
        inStock: true,
        isActive: true
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