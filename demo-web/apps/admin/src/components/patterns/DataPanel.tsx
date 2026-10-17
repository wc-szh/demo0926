import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DataPanelProps {
  title?: string
  children: ReactNode
  className?: string
}

export function DataPanel({ title, children, className }: DataPanelProps) {
  return (
    <div className={cn('rounded-2xl bg-card shadow-[0_4px_16px_rgba(29,33,41,0.04)]', className)}>
      {title && (
        <div className="border-b px-6 py-4">
          <h2 className="text-sm font-semibold">{title}</h2>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  )
}
