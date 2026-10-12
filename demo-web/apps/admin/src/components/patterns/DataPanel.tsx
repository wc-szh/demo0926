import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DataPanelProps {
  title?: string
  children: ReactNode
  className?: string
}

export function DataPanel({ title, children, className }: DataPanelProps) {
  return (
    <div className={cn('rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]', className)}>
      {title && (
        <div className="border-b px-6 py-4">
          <h2 className="text-sm font-semibold">{title}</h2>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  )
}
