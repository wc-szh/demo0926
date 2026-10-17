import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MobilePageShellProps {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  headerExtra?: ReactNode
}

export function MobilePageShell({
  title,
  subtitle,
  children,
  className,
  headerExtra,
}: MobilePageShellProps) {
  return (
    <div className={cn('min-h-full bg-page pb-4', className)}>
      <div className="flex items-center justify-between gap-3 bg-gradient-to-b from-profile-sky to-page px-4 pb-3 pt-5">
        <div className="min-w-0">
          <h1 className="text-lg font-semibold">{title}</h1>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {headerExtra}
      </div>
      <div className="space-y-3 px-3">{children}</div>
    </div>
  )
}
