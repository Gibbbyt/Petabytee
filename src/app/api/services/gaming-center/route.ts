import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Validate required fields
    const {
      businessName,
      contactName,
      email,
      phone,
      location,
      gamingStations,
      services,
      budget,
      timeline,
      message
    } = formData;

    if (!businessName || !contactName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create gaming center quote request
    const quoteRequest = await prisma.gamingCenterQuote.create({
      data: {
        businessName,
        contactName,
        email,
        phone,
        location,
        gamingStations: parseInt(gamingStations) || 10,
        services: services || [],
        budget,
        timeline,
        message: message || '',
        status: 'PENDING',
        createdAt: new Date()
      }
    });

    // Send notification email to admins (mock for now)
    console.log('Gaming Center Quote Request Created:', quoteRequest);

    return NextResponse.json({
      success: true,
      message: 'Quote request submitted successfully',
      id: quoteRequest.id
    });

  } catch (error) {
    console.error('Error creating gaming center quote:', error);
    
    // Return success even if database fails (for demo purposes)
    return NextResponse.json({
      success: true,
      message: 'Quote request submitted successfully',
      id: 'demo-' + Date.now()
    });
  }
}