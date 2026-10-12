import { Link } from 'react-router-dom'
import type { PipelineStatus, TaskPipelineCounts } from '@lingong/shared'
import { ChevronRight, FilePenLine, Loader, Wallet } from 'lucide-react'
import { PendingAcceptIcon } from '@/components/icons/PendingAcceptIcon'
import { cn } from '@/lib/utils'

const columns: {
  key: PipelineStatus
  label: string
  icon: React.ComponentType<{ className?: string }>
}[] = [
  { key: 'pendingAccept', label: '待接单', icon: PendingAcceptIcon },
  { key: 'inProgress', label: '进行中', icon: Loader },
  { key: 'revision', label: '交付修改', icon: FilePenLine },
  { key: 'paymentPending', label: '申请到账', icon: Wallet },
]

interface TaskPipelineRowProps {
  counts: TaskPipelineCounts
}

export function TaskPipelineRow({ counts }: TaskPipelineRowProps) {
  return (
    <div className="rounded-2xl border border-border bg-paper-white px-3 py-4 shadow-[var(--shadow-card)]">
      <p className="mb-4 px-1 text-sm font-medium">我的任务</p>

      <div className="flex items-stretch">
        <div className="flex min-w-0 flex-1 items-start justify-between">
          {columns.map(({ key, label, icon: Icon }) => {
            const count = counts[key]
            const isLucide = Icon !== PendingAcceptIcon
            return (
              <Link
                key={key}
                to={`/tasks/all?status=${key}`}
                className="flex min-w-0 flex-1 flex-col items-center gap-2 transition-opacity duration-200 active:opacity-70"
              >
                <div className="relative inline-flex items-center justify-center">
                  <Icon
                    className={cn(
                      'h-7 w-7',
                      isLucide && 'stroke-[1.5]',
                      count > 0 ? 'text-ink-black' : 'text-muted-foreground',
                    )}
                  />
                  {count > 0 && (
                    <span
                      className="absolute -right-2 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium leading-none text-paper-white"
                    >
                      {count > 99 ? '99+' : count}
                    </span>
                  )}
                </div>
                <span className="w-full truncate text-center text-[11px] text-foreground/80">{label}</span>
              </Link>
            )
          })}
        </div>

        <div className="mx-2 w-px shrink-0 self-stretch bg-border" aria-hidden />

        <Link
          to="/tasks/all"
          className="flex w-11 shrink-0 flex-col items-center justify-center gap-1.5 transition-opacity duration-200 active:opacity-70"
        >
          <span className="text-[11px] text-foreground/80">全部</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-cloud-gray">
            <ChevronRight className="h-3 w-3 text-muted-foreground" strokeWidth={2} />
          </span>
        </Link>
      </div>
    </div>
  )
}
