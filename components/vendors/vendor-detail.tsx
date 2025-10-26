import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { VendorWithAssessments, RiskLevel, VendorStatus } from '@/types/vendor'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  ExternalLink,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'

interface VendorDetailProps {
  vendor: VendorWithAssessments
}

export function VendorDetail({ vendor }: VendorDetailProps) {
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

  const getAssessmentIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getCheckTypeLabel = (checkType: string) => {
    switch (checkType) {
      case 'sanctions':
        return 'Sanctions Screening'
      case 'bankruptcy':
        return 'Bankruptcy Check'
      case 'business_registry':
        return 'Business Registry'
      case 'domain':
        return 'Domain Analysis'
      case 'news':
        return 'Negative News'
      default:
        return checkType
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Vendor Information */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="rounded-[35px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-600">
              <Shield className="h-5 w-5" />
              Vendor Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vendor.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{vendor.email}</span>
                </div>
              )}
              {vendor.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{vendor.phone}</span>
                </div>
              )}
              {vendor.website && (
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-gray-500" />
                  <a 
                    href={vendor.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Visit Website
                  </a>
                </div>
              )}
              {vendor.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{vendor.address}</span>
                </div>
              )}
              {vendor.business_registration_number && (
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{vendor.business_registration_number}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessments */}
        <Card className="rounded-[35px]">
          <CardHeader>
            <CardTitle className="text-gray-600">Risk Assessments</CardTitle>
            <CardDescription>
              Detailed breakdown of all risk checks performed
            </CardDescription>
          </CardHeader>
          <CardContent>
            {vendor.risk_assessments.length === 0 ? (
              <p className="text-sm text-gray-500">No assessments completed yet</p>
            ) : (
              <div className="space-y-4">
                {vendor.risk_assessments.map((assessment) => (
                  <div key={assessment.id} className="flex items-center justify-between p-4 border rounded-[35px]">
                    <div className="flex items-center gap-3">
                      {getAssessmentIcon(assessment.status)}
                      <div>
                        <div className="font-medium">{getCheckTypeLabel(assessment.check_type)}</div>
                        <div className="text-sm text-gray-500">
                          Score: {assessment.score} | 
                          {assessment.checked_at 
                            ? `Completed: ${new Date(assessment.checked_at).toLocaleDateString()}`
                            : 'Pending'
                          }
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {assessment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Risk Summary */}
      <div className="space-y-6">
        <Card className="rounded-[35px]">
          <CardHeader>
            <CardTitle className="text-gray-600">Risk Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-xl font-bold mb-2">{vendor.risk_score}</div>
              <Badge className={getRiskBadgeColor(vendor.risk_level)}>
                {vendor.risk_level} risk
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <Badge className={getStatusBadgeColor(vendor.status)}>
                  {vendor.status}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Last Assessed:</span>
                <span>
                  {vendor.last_assessed_at 
                    ? new Date(vendor.last_assessed_at).toLocaleDateString()
                    : 'Never'
                  }
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Added:</span>
                <span>{new Date(vendor.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="rounded-[35px]">
          <CardHeader>
            <CardTitle className="text-gray-600">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" variant="outline">
              Re-assess Risk
            </Button>
            <Button className="w-full" variant="outline">
              Export Report
            </Button>
            {vendor.status === 'pending' && (
              <>
                <Button className="w-full">
                  Approve Vendor
                </Button>
                <Button className="w-full" variant="destructive">
                  Reject Vendor
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
