import { VendorStats } from '@/types/vendor'

interface StatsCardsProps {
  stats: VendorStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Vendors',
      value: stats.total,
      color: 'text-gray-900',
    },
    {
      title: 'Pending Review',
      value: stats.pending,
      color: 'text-blue-600',
    },
    {
      title: 'High Risk',
      value: stats.highRisk,
      color: 'text-red-600',
    },
    {
      title: 'Approved',
      value: stats.approved,
      color: 'text-green-600',
    },
  ]

  return (
    <div className="bg-white rounded-[35px] p-4 border border-gray-200shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.title} className="relative">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-600 mb-1">
                {card.title}
              </div>              
              <div className={`text-xl font-bold ${card.color} mb-2`}>
                {card.value}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
