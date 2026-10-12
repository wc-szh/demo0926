import { cn } from '@/lib/utils'

interface MobilePageShellProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  headerExtra?: React.ReactNode
}

export function MobilePageShell({
  title,
  subtitle,
  children,
  className,
  headerExtra,
}: MobilePageShellProps) {
  return (
    <div className={cn('min-h-full bg-gradient-to-b from-profile-sky to-profile-gray pb-4', className)}>
      <div className="flex items-start justify-between gap-3 px-4 pb-3 pt-5">
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
