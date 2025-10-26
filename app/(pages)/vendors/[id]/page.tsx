import { VendorDetail } from '@/components/vendors/vendor-detail'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface VendorDetailPageProps {
  params: {
    id: string
  }
}

// Mock vendor data for frontend development
const mockVendor = {
  id: '1',
  name: 'ACME Corporation',
  email: 'contact@acme.com',
  phone: '+1 (555) 123-4567',
  website: 'https://acme.com',
  address: '123 Business St, New York, NY 10001',
  business_registration_number: '123456789',
  risk_score: 85,
  risk_level: 'high',
  status: 'pending',
  last_assessed_at: '2024-01-15T10:30:00Z',
  created_at: '2024-01-15T10:00:00Z',
  updated_at: '2024-01-15T10:30:00Z',
  risk_assessments: [
    {
      id: '1',
      check_type: 'sanctions',
      status: 'completed',
      score: 90,
      findings: {
        matches: [
          {
            name: 'ACME CORP',
            list: 'OFAC',
            score: 90,
            similarity: 0.95,
            details: 'OFAC SDN List'
          }
        ],
        totalScore: 90,
        status: 'completed',
        checked_at: '2024-01-15T10:30:00Z'
      },
      checked_at: '2024-01-15T10:30:00Z',
      created_at: '2024-01-15T10:00:00Z'
    }
  ]
}

export default function VendorDetailPage({ params }: VendorDetailPageProps) {
  return (
    <div className="mx-5 space-y-6">
      <div className="flex items-center gap-4 animate-fade-up">
        <Link href="/vendors">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Vendors
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-[1px]">{mockVendor.name}</h1>
          <p className="text-gray-600">Vendor due diligence details and risk assessment</p>
        </div>
      </div>

      <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <VendorDetail vendor={mockVendor} />
      </div>
    </div>
  )
}
