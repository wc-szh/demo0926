import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface HomeFeatureItem {
  to: string
  label: string
  icon: LucideIcon
  tone: string
  badge?: number
}

export function HomeFeatureRow({ items }: { items: HomeFeatureItem[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map(({ to, label, icon: Icon, tone, badge }) => (
        <Link
          key={to}
          to={to}
          className={cn(
            'relative flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-[18px] bg-gradient-to-br px-2 py-3 text-white shadow-[0_8px_18px_rgba(43,155,255,0.18)] active:opacity-90',
            tone,
          )}
        >
          <Icon className="h-6 w-6" strokeWidth={2.1} />
          <span className="text-[13px] font-semibold leading-none">{label}</span>
          {badge ? (
            <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold leading-none text-[#FF4D6A]">
              {badge > 9 ? '9+' : badge}
            </span>
          ) : null}
        </Link>
      ))}
    </div>
  )
}
