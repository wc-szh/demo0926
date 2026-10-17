import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface HomeToolItem {
  to?: string
  label: string
  icon: LucideIcon
  tone: string
  onClick?: () => void
}

export function HomeToolGrid({ items }: { items: HomeToolItem[] }) {
  return (
    <div className="grid grid-cols-4">
      {items.map(({ to, label, icon: Icon, tone, onClick }) => {
        const inner = (
          <>
            <span className={cn('flex h-11 w-11 items-center justify-center rounded-2xl text-white', tone)}>
              <Icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="max-w-[72px] text-center text-[11px] leading-tight text-[#4e5969]">{label}</span>
          </>
        )
        if (to) {
          return (
            <Link key={label} to={to} className="flex flex-col items-center gap-1.5 active:opacity-80">
              {inner}
            </Link>
          )
        }
        return (
          <button
            key={label}
            type="button"
            onClick={onClick}
            className="flex flex-col items-center gap-1.5 active:opacity-80"
          >
            {inner}
          </button>
        )
      })}
    </div>
  )
}
