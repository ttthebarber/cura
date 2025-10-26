import { StatsCards } from '@/components/dashboard/stats-cards'
import { RecentAlerts } from '@/components/dashboard/recent-alerts'
import { RiskDistributionChart } from '@/components/dashboard/risk-distribution-chart'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

// Mock data for frontend development
const mockStats = {
  total: 24,
  pending: 8,
  approved: 12,
  rejected: 4,
  highRisk: 3,
  mediumRisk: 7,
  lowRisk: 14,
}

const mockAlerts = [
  {
    id: '1',
    title: 'High Risk Vendor Detected',
    message: 'Vendor "ACME Corp" has been flagged as high risk (Score: 85)',
    severity: 'high',
    created_at: '2024-01-15T10:30:00Z',
    is_read: false,
  },
  {
    id: '2',
    title: 'Sanctions Match Found',
    message: 'Vendor "Suspicious Inc" matches 2 sanctions list entries',
    severity: 'critical',
    created_at: '2024-01-14T14:20:00Z',
    is_read: false,
  },
  {
    id: '3',
    title: 'Assessment Completed',
    message: 'Risk assessment completed for "Tech Solutions Ltd"',
    severity: 'low',
    created_at: '2024-01-13T09:15:00Z',
    is_read: true,
  },
]

export default function DashboardPage() {
  return (
    <div className="mx-5 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 pb-4 tracking-[1px]">Dashboard</h1>
      </div>

      {/* Vendor Overview Section */}
      <div className="relative group animate-fade-up">
        <div className="flex items-center justify-start gap-3 mb-4">
          <h2 className="text-lg font-medium text-gray-600">Vendor Overview</h2>
          <div className="text-sm font-medium text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <Link href="/vendors">
              <ArrowRight className="h-4 w-4 text-gray-500" />
            </Link>
          </div>
        </div>
        <StatsCards stats={mockStats} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <RecentAlerts alerts={mockAlerts} />
        </div>
        <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <RiskDistributionChart stats={mockStats} />
        </div>
      </div>
    </div>
  )
}