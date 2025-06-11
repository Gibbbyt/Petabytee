import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Get public statistics that can be displayed on homepage
    const [
      totalCustomers,
      totalPCBuilds,
      totalOrders,
      totalRepairs
    ] = await Promise.all([
      prisma.user.count({
        where: { role: 'CLIENT' }
      }),
      prisma.pcConfiguration.count({
        where: { status: 'SAVED' }
      }),
      prisma.order.count({
        where: { status: 'COMPLETED' }
      }),
      prisma.repair.count({
        where: { status: 'COMPLETED' }
      })
    ]);

    // Calculate rating based on completed orders and repairs
    const totalServices = totalOrders + totalRepairs;
    const rating = totalServices > 0 ? Math.min(5.0, 4.5 + (totalServices / 1000) * 0.5) : 4.8;

    return NextResponse.json({
      customers: totalCustomers,
      pcBuilds: totalPCBuilds,
      orders: totalOrders,
      repairs: totalRepairs,
      rating: Number(rating.toFixed(1)),
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching public stats:', error);
    
    // Return fallback stats if database is not available
    return NextResponse.json({
      customers: 500,
      pcBuilds: 250,
      orders: 150,
      repairs: 300,
      rating: 4.8,
      lastUpdated: new Date().toISOString()
    });
  }
}