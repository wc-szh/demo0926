import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'

export interface TodoActionItem {
  to: string
  icon: LucideIcon
  title: string
  description: string
  action: string
}

export function TodoActionList({
  title,
  extra,
  items,
}: {
  title: string
  extra?: ReactNode
  items: TodoActionItem[]
}) {
  if (items.length === 0) return null

  return (
    <section className="rounded-2xl bg-paper-white px-4 py-3 shadow-[0_4px_16px_rgba(29,33,41,0.04)]">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold">{title}</h2>
        {extra}
      </div>
      <ul>
        {items.map((item) => (
          <li
            key={item.to + item.title}
            className="flex items-center gap-3 border-b border-[#F2F3F5] py-3 last:border-b-0 last:pb-1"
          >
            <item.icon className="h-5 w-5 shrink-0 text-[#86909c]" strokeWidth={1.85} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-snug">{item.title}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.description}</p>
            </div>
            <Link
              to={item.to}
              className="shrink-0 rounded-md border border-brand-blue px-3 py-1.5 text-xs font-medium text-brand-blue-deep active:bg-accent"
            >
              {item.action}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
