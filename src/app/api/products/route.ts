import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  nameAl: z.string().min(1, 'Albanian name is required'),
  description: z.string().min(1, 'Description is required'),
  descriptionAl: z.string().min(1, 'Albanian description is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(0, 'Price must be positive'),
  image: z.string().optional(),
  stock: z.number().min(0, 'Stock quantity must be positive').default(0),
  isActive: z.boolean().default(true)
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const skip = (page - 1) * limit;

    const where: any = {
      isActive: true
    };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { nameAl: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { descriptionAl: { contains: search, mode: 'insensitive' } }
      ];
    }

    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          _count: {
            select: {
              orderItems: true,
              reviews: true
            }
          }
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.product.count({ where })
    ]);

    return NextResponse.json({
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        nameAl: product.nameAl,
        description: product.description,
        descriptionAl: product.descriptionAl,
        category: product.category,
        price: product.price,
        image: product.image,
        stock: product.stock,
        isActive: product.isActive,
        inStock: product.stock > 0,
        orderCount: product._count.orderItems,
        reviewCount: product._count.reviews,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get products error:', error);
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
    const validatedData = createProductSchema.parse(body);

    // Ensure all required fields are present for Prisma
    const productData = {
      name: validatedData.name,
      nameAl: validatedData.nameAl,
      description: validatedData.description,
      descriptionAl: validatedData.descriptionAl,
      category: validatedData.category,
      price: validatedData.price,
      stock: validatedData.stock,
      isActive: validatedData.isActive,
      ...(validatedData.image && { image: validatedData.image })
    };

    const product = await prisma.product.create({
      data: productData
    });

    return NextResponse.json({
      message: 'Product created successfully',
      product
    }, { status: 201 });

  } catch (error) {
    console.error('Create product error:', error);
    
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
    
    const userRole = (session?.user as any)?.role;
    if (!session || userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const body = await request.json();
    
    // Only use fields that are provided in the request
    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.nameAl !== undefined) updateData.nameAl = body.nameAl;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.descriptionAl !== undefined) updateData.descriptionAl = body.descriptionAl;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.price !== undefined) updateData.price = body.price;
    if (body.image !== undefined) updateData.image = body.image;
    if (body.stock !== undefined) updateData.stock = body.stock;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;

    const product = await prisma.product.update({
      where: { id: productId },
      data: updateData
    });

    return NextResponse.json({
      message: 'Product updated successfully',
      product
    });

  } catch (error) {
    console.error('Update product error:', error);
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
    if (!session || userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Soft delete by setting isActive to false
    const product = await prisma.product.update({
      where: { id: productId },
      data: { isActive: false }
    });

    return NextResponse.json({
      message: 'Product deleted successfully',
      product
    });

  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}