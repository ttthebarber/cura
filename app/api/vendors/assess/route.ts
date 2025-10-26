import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const vendorData = await request.json()
    const { name, email, phone, website, address, business_registration_number } = vendorData

    // Mock vendor creation and risk assessment for frontend development
    const mockVendor = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      phone,
      website,
      address,
      business_registration_number,
      risk_score: Math.floor(Math.random() * 100),
      risk_level: 'low',
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Mock risk assessment result
    const mockAssessment = {
      matches: [],
      totalScore: mockVendor.risk_score,
      status: 'completed',
      checked_at: new Date().toISOString()
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({ 
      success: true, 
      vendor: mockVendor,
      assessment: mockAssessment,
      message: 'Mock vendor created and risk assessment completed'
    })

  } catch (error) {
    console.error('Error in mock vendor assessment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
