import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30d';

    // Calculate date ranges
    const now = new Date();
    const startDate = new Date();
    
    switch (period) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    // Get revenue statistics
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate
        },
        status: {
          not: 'CANCELLED'
        }
      },
      select: {
        total: true,
        createdAt: true,
        status: true
      }
    });

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const todayRevenue = orders.filter(order => 
      order.createdAt.toDateString() === now.toDateString()
    ).reduce((sum, order) => sum + order.total, 0);

    // Get previous period for comparison
    const prevStartDate = new Date(startDate);
    prevStartDate.setDate(prevStartDate.getDate() - (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const prevOrders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: prevStartDate,
          lt: startDate
        },
        status: {
          not: 'CANCELLED'
        }
      },
      select: {
        total: true
      }
    });

    const prevRevenue = prevOrders.reduce((sum, order) => sum + order.total, 0);
    const revenueGrowth = prevRevenue > 0 ? ((totalRevenue - prevRevenue) / prevRevenue) * 100 : 0;

    // Get order statistics
    const [
      totalOrders,
      pendingOrders,
      processingOrders,
      completedOrders,
      cancelledOrders
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.count({ where: { status: 'PROCESSING' } }),
      prisma.order.count({ where: { status: 'DELIVERED' } }),
      prisma.order.count({ where: { status: 'CANCELLED' } })
    ]);

    // Get repair statistics
    const [
      totalRepairs,
      activeRepairs,
      completedRepairs,
      easyMailInRepairs
    ] = await Promise.all([
      prisma.repair.count(),
      prisma.repair.count({ 
        where: { 
          status: { 
            in: ['PENDING', 'RECEIVED', 'DIAGNOSING', 'REPAIRING'] 
          } 
        } 
      }),
      prisma.repair.count({ where: { status: 'COMPLETED' } }),
      prisma.repair.count({ where: { isEasyMailIn: true } })
    ]);

    // Get customer statistics
    const [
      totalCustomers,
      newCustomers,
      activeCustomers
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'CLIENT' } }),
      prisma.user.count({ 
        where: { 
          role: 'CLIENT',
          createdAt: {
            gte: startDate
          }
        } 
      }),
      prisma.user.count({ 
        where: { 
          role: 'CLIENT',
          lastLoginAt: {
            gte: startDate
          }
        } 
      })
    ]);

    // Get inventory alerts (mock for now - would need product inventory tracking)
    const lowStockItems = 8; // This would come from product inventory
    const outOfStockItems = 3; // This would come from product inventory

    // Get recent orders
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    // Get active repairs
    const activeRepairsList = await prisma.repair.findMany({
      take: 5,
      where: {
        status: {
          in: ['PENDING', 'RECEIVED', 'DIAGNOSING', 'REPAIRING']
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    // Get notifications (recent activity)
    const notifications = [
      {
        id: '1',
        type: 'low_stock',
        message: `${lowStockItems} produkte kanë stok të ulët`,
        time: '5 minuta më parë'
      },
      {
        id: '2',
        type: 'new_order',
        message: `Porosi e re ${recentOrders[0]?.orderNumber || '#PB-2024-XXX'}`,
        time: '15 minuta më parë'
      },
      {
        id: '3',
        type: 'repair_update',
        message: `Riparim ${activeRepairsList[0]?.repairNumber || 'PR-2024-XXX'} përditësuar`,
        time: '1 orë më parë'
      }
    ];

    const stats = {
      revenue: {
        today: todayRevenue,
        thisMonth: totalRevenue,
        lastMonth: prevRevenue,
        growth: revenueGrowth
      },
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        processing: processingOrders,
        completed: completedOrders,
        cancelled: cancelledOrders
      },
      repairs: {
        total: totalRepairs,
        active: activeRepairs,
        completed: completedRepairs,
        easyMailIn: easyMailInRepairs
      },
      customers: {
        total: totalCustomers,
        new: newCustomers,
        active: activeCustomers
      },
      inventory: {
        lowStock: lowStockItems,
        outOfStock: outOfStockItems
      }
    };

    return NextResponse.json({
      stats,
      recentOrders: recentOrders.map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        customer: order.user.name,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt
      })),
      activeRepairs: activeRepairsList.map(repair => ({
        id: repair.id,
        repairNumber: repair.repairNumber,
        customer: repair.user.name,
        device: repair.deviceType,
        status: repair.status,
        isEasyMailIn: repair.isEasyMailIn,
        createdAt: repair.createdAt
      })),
      notifications
    });

  } catch (error) {
    console.error('Get admin stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}