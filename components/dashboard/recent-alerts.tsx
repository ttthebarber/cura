import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert } from '@/types/vendor'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface RecentAlertsProps {
  alerts: Alert[]
}

export function RecentAlerts({ alerts }: RecentAlertsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="rounded-[35px]">
      <CardHeader>
        <div className="relative group">
          <div className="flex items-center justify-start gap-3">
            <CardTitle className="flex items-center gap-2 text-gray-600">
              Recent Alerts
            </CardTitle>
            <div className="text-sm font-medium text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <Link href="/alerts">
                <ArrowRight className="h-4 w-4 text-gray-500" />
              </Link>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <p className="text-sm text-gray-500">No recent alerts</p>
        ) : (
          <div className="space-y-6">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start justify-between pb-1">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                    <span className="text-sm font-medium">{alert.title}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(alert.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
