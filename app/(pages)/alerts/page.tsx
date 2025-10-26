import { AlertsList } from '@/components/alerts/alerts-list'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

// Mock alerts data for frontend development
const mockAlerts = [
  {
    id: '1',
    title: 'High Risk Vendor Detected',
    message: 'Vendor "ACME Corp" has been flagged as high risk (Score: 85)',
    severity: 'high',
    is_read: false,
    created_at: '2024-01-15T10:30:00Z',
    vendors: {
      id: '1',
      name: 'ACME Corporation'
    }
  },
  {
    id: '2',
    title: 'Sanctions Match Found',
    message: 'Vendor "Suspicious Inc" matches 2 sanctions list entries',
    severity: 'critical',
    is_read: false,
    created_at: '2024-01-14T14:20:00Z',
    vendors: {
      id: '2',
      name: 'Suspicious Inc'
    }
  },
  {
    id: '3',
    title: 'Assessment Completed',
    message: 'Risk assessment completed for "Tech Solutions Ltd"',
    severity: 'low',
    is_read: true,
    created_at: '2024-01-13T09:15:00Z',
    vendors: {
      id: '3',
      name: 'Tech Solutions Ltd'
    }
  }
]

export default function AlertsPage() {
  const unreadCount = mockAlerts.filter(alert => !alert.is_read).length

  return (
    <div className="mx-5 space-y-6">
      <div className="animate-fade-up">
        <h1 className="text-xl font-bold text-gray-900 pb-4 tracking-[1px]">Alerts</h1>
        <p className="text-gray-600">
          {unreadCount} unread alert{unreadCount !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <AlertsList alerts={mockAlerts} />
      </div>
    </div>
  )
}
