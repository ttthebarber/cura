import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { VendorWithAssessments, RiskLevel, VendorStatus } from '@/types/vendor'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Mail, Phone, MapPin, Building } from 'lucide-react'

interface VendorTableProps {
  vendors: VendorWithAssessments[]
}

export function VendorTable({ vendors }: VendorTableProps) {
  const getRiskBadgeColor = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusBadgeColor = (status: VendorStatus) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getAssessmentStatus = (assessments: any[]) => {
    const completed = assessments.filter(a => a.status === 'completed').length
    const total = assessments.length
    return `${completed}/${total}`
  }

  return (
    <Card className="rounded-[35px]">
      <CardHeader>
        <CardTitle className="text-gray-600">Vendor List</CardTitle>
        <CardDescription>
          {vendors.length} vendor{vendors.length !== 1 ? 's' : ''} in your system
        </CardDescription>
      </CardHeader>
      <CardContent>
        {vendors.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No vendors added yet</p>
            <Link href="/dashboard/vendors/add">
              <Button>Add Your First Vendor</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {vendors.map((vendor) => (
              <div
                key={vendor.id}
                className="flex items-center justify-between p-6 border rounded-[35px] hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{vendor.name}</h3>
                    <Badge className={getRiskBadgeColor(vendor.risk_level)}>
                      {vendor.risk_level} risk
                    </Badge>
                    <Badge className={getStatusBadgeColor(vendor.status)}>
                      {vendor.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {vendor.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {vendor.email}
                      </div>
                    )}
                    {vendor.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {vendor.phone}
                      </div>
                    )}
                    {vendor.website && (
                      <div className="flex items-center gap-1">
                        <ExternalLink className="h-4 w-4" />
                        <a 
                          href={vendor.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-indigo-600"
                        >
                          Website
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-500">
                    Risk Score: {vendor.risk_score} | 
                    Assessments: {getAssessmentStatus(vendor.risk_assessments)} | 
                    Added: {new Date(vendor.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Link href={`/dashboard/vendors/${vendor.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
