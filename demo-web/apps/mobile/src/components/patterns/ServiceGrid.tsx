import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ServiceGridItem {
  to: string
  label: string
  icon: LucideIcon
  tone: string
  badge?: number
}

export function ServiceGrid({ items }: { items: ServiceGridItem[] }) {
  return (
    <div className="grid grid-cols-4 gap-y-3 px-1 py-1">
      {items.map(({ to, label, icon: Icon, tone, badge }) => (
        <Link
          key={to + label}
          to={to}
          className="relative flex min-h-11 flex-col items-center gap-1.5 active:opacity-80"
        >
          <span
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-2xl text-white',
              tone,
            )}
          >
            <Icon className="h-6 w-6" strokeWidth={2} />
          </span>
          <span className="max-w-[64px] text-center text-[11px] leading-tight text-[#4e5969]">
            {label}
          </span>
          {badge ? (
            <span className="absolute right-1 top-[-4px] flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FF4D4F] px-1 text-[10px] font-medium leading-none text-white">
              {badge > 9 ? '9+' : badge}
            </span>
          ) : null}
        </Link>
      ))}
    </div>
  )
}
