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
    const metric = searchParams.get('metric') || 'overview';

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

    if (metric === 'overview') {
      // Revenue analytics
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
          type: true
        }
      });

      const revenueByDate = orders.reduce((acc: any, order) => {
        const date = order.createdAt.toISOString().split('T')[0];
        if (!acc[date]) {
          acc[date] = { total: 0, count: 0 };
        }
        acc[date].total += order.total;
        acc[date].count += 1;
        return acc;
      }, {});

      const revenueByType = orders.reduce((acc: any, order) => {
        if (!acc[order.type]) {
          acc[order.type] = { total: 0, count: 0 };
        }
        acc[order.type].total += order.total;
        acc[order.type].count += 1;
        return acc;
      }, {});

      // Customer analytics
      const customers = await prisma.user.findMany({
        where: {
          role: 'CLIENT',
          createdAt: {
            gte: startDate
          }
        }
      });

      const customersByDate = customers.reduce((acc: any, customer) => {
        const date = customer.createdAt.toISOString().split('T')[0];
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += 1;
        return acc;
      }, {});

      // Repair analytics
      const repairs = await prisma.repair.findMany({
        where: {
          createdAt: {
            gte: startDate
          }
        },
        select: {
          status: true,
          createdAt: true,
          isEasyMailIn: true,
          finalCost: true
        }
      });

      const repairsByStatus = repairs.reduce((acc: any, repair) => {
        if (!acc[repair.status]) {
          acc[repair.status] = 0;
        }
        acc[repair.status] += 1;
        return acc;
      }, {});

      const easyMailInCount = repairs.filter(r => r.isEasyMailIn).length;
      const totalRepairRevenue = repairs.reduce((sum, repair) => sum + (repair.finalCost || 0), 0);

      // Top performing services
      const topServices = [
        { name: 'PC Configurator', revenue: revenueByType['PC_BUILD']?.total || 0, orders: revenueByType['PC_BUILD']?.count || 0 },
        { name: 'PS5 Controller', revenue: revenueByType['PS5_CONTROLLER']?.total || 0, orders: revenueByType['PS5_CONTROLLER']?.count || 0 },
        { name: 'Products', revenue: revenueByType['PRODUCT']?.total || 0, orders: revenueByType['PRODUCT']?.count || 0 },
        { name: 'Gift Cards', revenue: revenueByType['GIFT_CARD']?.total || 0, orders: revenueByType['GIFT_CARD']?.count || 0 },
        { name: 'Repairs', revenue: totalRepairRevenue, orders: repairs.length }
      ].sort((a, b) => b.revenue - a.revenue);

      return NextResponse.json({
        overview: {
          totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
          totalOrders: orders.length,
          totalCustomers: customers.length,
          totalRepairs: repairs.length,
          avgOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0,
          easyMailInPercentage: repairs.length > 0 ? (easyMailInCount / repairs.length) * 100 : 0
        },
        charts: {
          revenueByDate: Object.entries(revenueByDate).map(([date, data]: [string, any]) => ({
            date,
            revenue: data.total,
            orders: data.count
          })),
          revenueByType: Object.entries(revenueByType).map(([type, data]: [string, any]) => ({
            type,
            revenue: data.total,
            orders: data.count,
            percentage: ((data.total / orders.reduce((sum, order) => sum + order.total, 0)) * 100).toFixed(1)
          })),
          customersByDate: Object.entries(customersByDate).map(([date, count]) => ({
            date,
            customers: count
          })),
          repairsByStatus: Object.entries(repairsByStatus).map(([status, count]) => ({
            status,
            count,
            percentage: ((count as number / repairs.length) * 100).toFixed(1)
          }))
        },
        topServices,
        period
      });
    }

    if (metric === 'sales') {
      // Detailed sales analytics
      const salesData = await prisma.order.findMany({
        where: {
          createdAt: {
            gte: startDate
          }
        },
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          },
          orderItems: {
            include: {
              product: {
                select: {
                  name: true,
                  category: true
                }
              }
            }
          }
        }
      });

      return NextResponse.json({
        sales: salesData.map(order => ({
          id: order.id,
          orderNumber: order.orderNumber,
          customer: order.user.name,
          total: order.total,
          status: order.status,
          type: order.type,
          createdAt: order.createdAt,
          itemCount: order.orderItems.length
        })),
        summary: {
          totalSales: salesData.reduce((sum, order) => sum + order.total, 0),
          orderCount: salesData.length,
          avgOrderValue: salesData.length > 0 ? salesData.reduce((sum, order) => sum + order.total, 0) / salesData.length : 0
        }
      });
    }

    return NextResponse.json({ error: 'Invalid metric' }, { status: 400 });

  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}