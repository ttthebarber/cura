import { VendorTable } from '@/components/vendors/vendor-table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

// Mock vendor data for frontend development
const mockVendors = [
  {
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
        checked_at: '2024-01-15T10:30:00Z'
      }
    ]
  },
  {
    id: '2',
    name: 'Tech Solutions Ltd',
    email: 'info@techsolutions.com',
    phone: '+1 (555) 987-6543',
    website: 'https://techsolutions.com',
    address: '456 Tech Ave, San Francisco, CA 94105',
    business_registration_number: '987654321',
    risk_score: 25,
    risk_level: 'low',
    status: 'approved',
    last_assessed_at: '2024-01-14T14:20:00Z',
    created_at: '2024-01-14T14:00:00Z',
    updated_at: '2024-01-14T14:20:00Z',
    risk_assessments: [
      {
        id: '2',
        check_type: 'sanctions',
        status: 'completed',
        score: 0,
        checked_at: '2024-01-14T14:20:00Z'
      }
    ]
  },
  {
    id: '3',
    name: 'Global Services Inc',
    email: 'hello@globalservices.com',
    phone: '+1 (555) 456-7890',
    website: 'https://globalservices.com',
    address: '789 Global Blvd, Chicago, IL 60601',
    business_registration_number: '456789123',
    risk_score: 45,
    risk_level: 'medium',
    status: 'pending',
    last_assessed_at: '2024-01-13T09:15:00Z',
    created_at: '2024-01-13T09:00:00Z',
    updated_at: '2024-01-13T09:15:00Z',
    risk_assessments: [
      {
        id: '3',
        check_type: 'sanctions',
        status: 'completed',
        score: 30,
        checked_at: '2024-01-13T09:15:00Z'
      }
    ]
  }
]

export default function VendorsPage() {
  return (
    <div className="mx-5 space-y-6">
      <div className="animate-fade-up">
        <h1 className="text-xl font-bold text-gray-900 pb-4 tracking-[1px]">Vendors</h1>
        <p className="text-gray-600">Manage and monitor your vendor due diligence</p>
      </div>

      <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <VendorTable vendors={mockVendors} />
      </div>
    </div>
  )
}
