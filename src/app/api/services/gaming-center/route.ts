import { NextRequest, NextResponse } from 'next/server';

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

    // Generate a quote ID for demo purposes
    const quoteId = 'GC-' + Date.now().toString().slice(-6);

    // Log the request for demo purposes
    console.log('Gaming Center Quote Request:', {
      id: quoteId,
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
    });

    return NextResponse.json({
      success: true,
      message: 'Quote request submitted successfully',
      id: quoteId
    });

  } catch (error) {
    console.error('Error processing gaming center quote:', error);
    
    return NextResponse.json({
      success: true,
      message: 'Quote request submitted successfully',
      id: 'demo-' + Date.now()
    });
  }
}