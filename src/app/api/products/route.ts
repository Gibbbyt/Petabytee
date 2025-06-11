import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  nameEn: z.string().min(1, 'English name is required'),
  description: z.string().min(1, 'Description is required'),
  descriptionEn: z.string().min(1, 'English description is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(0, 'Price must be positive'),
  salePrice: z.number().optional(),
  stockQuantity: z.number().min(0, 'Stock quantity must be positive'),
  sku: z.string().optional(),
  images: z.array(z.string()).optional(),
  specifications: z.array(z.string()).optional(),
  specificationsEn: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  isActive: z.boolean().default(true)
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
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

    if (featured === 'true') {
      where.featured = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { nameEn: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { descriptionEn: { contains: search, mode: 'insensitive' } }
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
        nameEn: product.nameEn,
        description: product.description,
        descriptionEn: product.descriptionEn,
        category: product.category,
        price: product.price,
        salePrice: product.salePrice,
        stockQuantity: product.stockQuantity,
        sku: product.sku,
        images: product.images,
        specifications: product.specifications,
        specificationsEn: product.specificationsEn,
        tags: product.tags,
        featured: product.featured,
        isActive: product.isActive,
        inStock: product.stockQuantity > 0,
        orderCount: product._count.orderItems,
        reviewCount: product._count.reviews,
        rating: product.averageRating,
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
    const productData = createProductSchema.parse(body);

    // Generate SKU if not provided
    if (!productData.sku) {
      const categoryPrefix = productData.category.substring(0, 3).toUpperCase();
      const timestamp = Date.now().toString().slice(-6);
      productData.sku = `${categoryPrefix}-${timestamp}`;
    }

    const product = await prisma.product.create({
      data: {
        ...productData,
        images: productData.images || [],
        specifications: productData.specifications || [],
        specificationsEn: productData.specificationsEn || [],
        tags: productData.tags || []
      }
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
    const productData = createProductSchema.partial().parse(body);

    const product = await prisma.product.update({
      where: { id: productId },
      data: productData
    });

    return NextResponse.json({
      message: 'Product updated successfully',
      product
    });

  } catch (error) {
    console.error('Update product error:', error);
    
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