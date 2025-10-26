import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VendorStats } from '@/types/vendor'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface RiskDistributionChartProps {
  stats: VendorStats
}

export function RiskDistributionChart({ stats }: RiskDistributionChartProps) {
  const data = [
    { name: 'Low Risk', value: stats.lowRisk, color: '#10B981', percentage: stats.total > 0 ? Math.round((stats.lowRisk / stats.total) * 100) : 0 },
    { name: 'Medium Risk', value: stats.mediumRisk, color: '#F59E0B', percentage: stats.total > 0 ? Math.round((stats.mediumRisk / stats.total) * 100) : 0 },
    { name: 'High Risk', value: stats.highRisk, color: '#EF4444', percentage: stats.total > 0 ? Math.round((stats.highRisk / stats.total) * 100) : 0 },
  ].filter(item => item.value > 0)

  return (
    <Card className="rounded-[35px]">
      <CardHeader>
        <div className="relative group">
          <div className="flex items-center justify-start gap-3">
            <CardTitle className="text-gray-600">
              Risk Distribution
            </CardTitle>
            <div className="text-sm font-medium text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <Link href="/vendors">
                <ArrowRight className="h-4 w-4 text-gray-500" />
              </Link>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {stats.total === 0 ? (
          <p className="text-sm text-gray-500">No vendors here yet.</p>
        ) : (
          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-sm text-gray-600 font-medium">{item.value} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            ))}
            
            {/* Simple donut chart representation */}
            <div className="mt-6 flex justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  {data.map((item, index) => {
                    const startAngle = data.slice(0, index).reduce((acc, curr) => acc + (curr.percentage * 3.6), 0)
                    const endAngle = startAngle + (item.percentage * 3.6)
                    const radius = 40
                    const x1 = 50 + radius * Math.cos((startAngle * Math.PI) / 180)
                    const y1 = 50 + radius * Math.sin((startAngle * Math.PI) / 180)
                    const x2 = 50 + radius * Math.cos((endAngle * Math.PI) / 180)
                    const y2 = 50 + radius * Math.sin((endAngle * Math.PI) / 180)
                    const largeArcFlag = item.percentage > 50 ? 1 : 0
                    
                    return (
                      <path
                        key={item.name}
                        d={`M 50 50 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                        fill={item.color}
                        stroke="white"
                        strokeWidth="2"
                      />
                    )
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-bold">{stats.total}</div>
                    <div className="text-xs text-gray-500">Total</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
