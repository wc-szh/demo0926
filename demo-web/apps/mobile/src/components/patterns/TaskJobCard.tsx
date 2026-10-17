import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { formatCurrency } from '@lingong/shared'
import type { OfflineJob } from '@lingong/shared'
import { StatusBadge } from '@/components/patterns/StatusBadge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface TaskJobCardProps {
  job: OfflineJob
  followed?: boolean
  onToggleFollow?: () => void
  actions?: React.ReactNode
  className?: string
}

export function TaskJobCard({ job, followed, onToggleFollow, actions, className }: TaskJobCardProps) {
  return (
    <div className={cn('rounded-lg bg-paper-white p-4 shadow-[0_4px_16px_rgba(29,33,41,0.04)]', className)}>
      <div className="flex items-start gap-2">
        <Link to={`/tasks/${job.id}`} className="min-w-0 flex-1 active:opacity-80">
          <div className="flex items-start justify-between gap-2">
            <p className="font-medium leading-snug">{job.title}</p>
            <StatusBadge status={job.status} />
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{job.description}</p>
          <p className="mt-3 text-sm font-semibold tabular-nums">{formatCurrency(job.commissionBase)}</p>
        </Link>
        {onToggleFollow && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0"
            aria-label={followed ? '取消关注' : '关注任务'}
            onClick={onToggleFollow}
          >
            <Star
              className={cn('h-5 w-5', followed ? 'fill-brand-blue text-brand-blue' : 'text-muted-foreground')}
              strokeWidth={1.75}
            />
          </Button>
        )}
      </div>
      {actions && <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">{actions}</div>}
    </div>
  )
}
