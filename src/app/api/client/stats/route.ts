import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    const userRole = (session?.user as any)?.role;
    if (!session || userRole !== 'CLIENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any)?.id;

    // Get client statistics
    const [
      totalOrders,
      activeRepairs,
      pcConfigs,
      ps5Configs
    ] = await Promise.all([
      prisma.order.count({
        where: { userId }
      }),
      prisma.repair.count({
        where: { 
          userId,
          status: {
            in: ['PENDING', 'RECEIVED', 'DIAGNOSING', 'REPAIRING']
          }
        }
      }),
      prisma.pCConfig.count({
        where: { userId }
      }),
      prisma.pS5Config.count({
        where: { userId }
      })
    ]);

    // Get recent orders
    const recentOrders = await prisma.order.findMany({
      where: { userId },
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                nameAl: true
              }
            }
          }
        },
        pcConfig: {
          select: {
            name: true
          }
        },
        ps5Config: {
          select: {
            name: true
          }
        }
      }
    });

    // Get active repairs
    const activeRepairsList = await prisma.repair.findMany({
      where: { 
        userId,
        status: {
          in: ['PENDING', 'RECEIVED', 'DIAGNOSING', 'REPAIRING']
        }
      },
      take: 5,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const stats = {
      totalOrders,
      activeRepairs,
      pcConfigs,
      ps5Configs
    };

    return NextResponse.json({
      stats,
      recentOrders: recentOrders.map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        total: order.total,
        createdAt: order.createdAt,
        items: order.items.map(item => item.product.name),
        configName: order.pcConfig?.name || order.ps5Config?.name || null
      })),
      activeRepairs: activeRepairsList.map(repair => ({
        id: repair.id,
        repairNumber: repair.repairNumber,
        deviceType: repair.deviceType,
        status: repair.status,
        createdAt: repair.createdAt
      }))
    });

  } catch (error) {
    console.error('Get client stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}