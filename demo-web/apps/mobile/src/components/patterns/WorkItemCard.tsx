import { Link } from 'react-router-dom'
import { formatCurrency } from '@lingong/shared'
import { StatusBadge } from '@/components/patterns/StatusBadge'
import { cn } from '@/lib/utils'
import type { WorkListItem } from '@/lib/workItems'
import { workItemDetailPath } from '@/lib/workItems'

interface WorkItemCardProps {
  item: WorkListItem
  actions?: React.ReactNode
  trailing?: React.ReactNode
  className?: string
}

function typeLabel(item: WorkListItem) {
  return item.kind === 'online' ? 'AI 视频' : '实拍'
}

export function WorkItemCard({ item, actions, trailing, className }: WorkItemCardProps) {
  const title = item.data.title
  const subtitle =
    item.kind === 'online'
      ? item.data.externalOrderNo
      : item.data.dispatchMode === 'ASSIGN'
        ? '指派'
        : '公开申请'

  return (
    <div className={cn('rounded-2xl border border-border bg-paper-white p-4 shadow-[var(--shadow-card)]', className)}>
      <div className="flex items-start gap-2">
        <Link to={workItemDetailPath(item)} className="min-w-0 flex-1 active:opacity-80">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-sm bg-mist-gray px-1.5 py-0.5 text-[10px] text-muted-foreground">
              {typeLabel(item)}
            </span>
            <StatusBadge status={item.data.status} />
          </div>
          <p className="mt-2 font-medium leading-snug">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {item.kind === 'offline' ? item.data.description.slice(0, 48) : subtitle}
          </p>
          <p className="mt-3 text-sm font-semibold tabular-nums">{formatCurrency(item.data.commissionBase)}</p>
        </Link>
        {trailing}
      </div>
      {actions && <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">{actions}</div>}
    </div>
  )
}
