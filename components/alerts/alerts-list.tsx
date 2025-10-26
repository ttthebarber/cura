import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert } from '@/types/vendor'
import Link from 'next/link'
import { AlertTriangle, ExternalLink } from 'lucide-react'

interface AlertsListProps {
  alerts: (Alert & { vendors: { id: string; name: string } })[]
}

export function AlertsList({ alerts }: AlertsListProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-orange-600" />
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'low':
        return <AlertTriangle className="h-5 w-5 text-blue-600" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <Card className="rounded-[35px]">
      <CardHeader>
        <CardTitle className="text-gray-600">Security Alerts</CardTitle>
        <CardDescription>
          {alerts.length} alert{alerts.length !== 1 ? 's' : ''} requiring your attention
        </CardDescription>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No alerts at this time</p>
            <p className="text-sm text-gray-400 mt-2">
              Alerts will appear here when risk assessments detect issues
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-6 border rounded-[35px] transition-colors ${
                  alert.is_read ? 'bg-gray-50' : 'bg-white border-l-4 border-l-indigo-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getSeverityIcon(alert.severity)}
                      <h3 className="font-semibold text-lg">{alert.title}</h3>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                      {!alert.is_read && (
                        <Badge variant="outline" className="bg-indigo-100 text-indigo-800">
                          New
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-700 mb-3">{alert.message}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Vendor: {alert.vendors.name}</span>
                      <span>•</span>
                      <span>{new Date(alert.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Link href={`/vendors/${alert.vendor_id}`}>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Vendor
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
