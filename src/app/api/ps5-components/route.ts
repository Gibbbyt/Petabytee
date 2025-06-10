import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let where: any = {
      isActive: true,
      inStock: true
    };

    if (category) {
      where.category = category.toUpperCase();
    }

    const components = await prisma.ps5Component.findMany({
      where,
      orderBy: [
        { category: 'asc' },
        { price: 'asc' }
      ]
    });

    return NextResponse.json({
      components: components.map(component => ({
        id: component.id,
        name: component.name,
        nameEn: component.nameEn,
        description: component.description,
        descriptionEn: component.descriptionEn,
        category: component.category,
        price: component.price,
        colorOptions: component.colorOptions,
        image: component.image,
        inStock: component.inStock
      }))
    });

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
    const body = await request.json();
    const {
      name,
      nameEn,
      description,
      descriptionEn,
      category,
      price,
      colorOptions,
      image
    } = body;

    const component = await prisma.ps5Component.create({
      data: {
        name,
        nameEn,
        description,
        descriptionEn,
        category: category.toUpperCase(),
        price: parseFloat(price),
        colorOptions: colorOptions || [],
        image,
        inStock: true,
        isActive: true
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