import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Get public statistics that don't require authentication
    const [
      totalOrders,
      totalConfigurations,
      totalRepairs,
      totalCustomers
    ] = await Promise.all([
      prisma.order.count(),
      // Count both PC and PS5 configurations
      Promise.all([
        prisma.pCConfig.count({
          where: { status: 'SAVED' }
        }),
        prisma.pS5Config.count({
          where: { status: 'SAVED' }
        })
      ]).then(([pcCount, ps5Count]) => pcCount + ps5Count),
      prisma.repair.count({
        where: { status: 'COMPLETED' }
      }),
      prisma.user.count({
        where: { role: 'CLIENT' }
      })
    ]);

    const stats = {
      totalOrders,
      totalConfigurations,
      totalRepairs,
      totalCustomers,
      // Add some default metrics for homepage
      satisfaction: 4.9,
      countries: 3, // Kosovo, Albania, North Macedonia
      experience: '5+'
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Get public stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}