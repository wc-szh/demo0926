import { Link } from 'react-router-dom'
import { Clapperboard, Film, Sparkles, Star, Store, Video } from 'lucide-react'
import { formatCurrency } from '@lingong/shared'
import type { OfflineJob } from '@lingong/shared'
import { cn } from '@/lib/utils'
import type { TaskHallCategoryKey } from '@/components/patterns/TaskHallCategoryTabs'

const THUMB_STYLES: Record<
  TaskHallCategoryKey,
  { gradient: string; icon: typeof Clapperboard }
> = {
  live: { gradient: 'from-brand-blue to-brand-blue-deep', icon: Clapperboard },
  store: { gradient: 'from-[#FB7185] to-[#F59E0B]', icon: Store },
  event: { gradient: 'from-[#A78BFA] to-brand-blue-deep', icon: Video },
  edit: { gradient: 'from-[#7AD4FF] to-brand-blue', icon: Film },
  ai: { gradient: 'from-brand-blue-deep to-[#A78BFA]', icon: Sparkles },
}

function inferTags(job: OfflineJob): string[] {
  const text = `${job.title}${job.description}`
  const tags: string[] = []
  if (/竖屏|60s|短视频/.test(text)) tags.push('竖屏')
  if (/实拍|拍摄|外景/.test(text)) tags.push('实拍')
  if (/动画|AE|二维/.test(text)) tags.push('动画')
  if (/探店|门店/.test(text)) tags.push('探店')
  if (/活动|展会/.test(text)) tags.push('活动')
  if (tags.length === 0) tags.push('视频')
  tags.push('佣金结算')
  return tags.slice(0, 3)
}

function inferCategoryKey(job: OfflineJob): TaskHallCategoryKey {
  const text = `${job.title}${job.description}`
  if (/动画|AI|二维|AE/.test(text)) return 'ai'
  if (/探店|开箱|门店/.test(text)) return 'store'
  if (/活动|展会|纪实/.test(text)) return 'event'
  if (/精剪|Vlog|素材/.test(text)) return 'edit'
  return 'live'
}

interface TaskHallFeedCardProps {
  job: OfflineJob
  followed?: boolean
  onToggleFollow?: () => void
}

export function TaskHallFeedCard({ job, followed, onToggleFollow }: TaskHallFeedCardProps) {
  const category = inferCategoryKey(job)
  const thumb = THUMB_STYLES[category]
  const ThumbIcon = thumb.icon
  const tags = inferTags(job)

  return (
    <div className="flex gap-3 rounded-lg bg-paper-white p-3 shadow-[0_4px_16px_rgba(29,33,41,0.04)]">
      <Link
        to={`/tasks/${job.id}`}
        className={cn(
          'relative flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br',
          thumb.gradient,
        )}
      >
        <ThumbIcon className="h-9 w-9 text-white/35" strokeWidth={1.25} />
      </Link>
      <div className="min-w-0 flex-1">
        <Link to={`/tasks/${job.id}`} className="block active:opacity-85">
          <p className="text-[15px] font-semibold leading-snug text-ink-black">{job.title}</p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[4px] bg-mist-gray px-1.5 py-0.5 text-[10px] leading-none text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            <span className="text-[11px] font-medium tabular-nums text-brand-blue-deep">
              {formatCurrency(job.commissionBase)}
            </span>
          </div>
        </Link>
      </div>
      {onToggleFollow && (
        <button
          type="button"
          className="flex h-8 w-8 shrink-0 items-center justify-center self-start rounded-full active:bg-mist-gray"
          aria-label={followed ? '取消关注' : '关注任务'}
          onClick={onToggleFollow}
        >
          <Star
            className={cn('h-5 w-5', followed ? 'fill-brand-blue text-brand-blue' : 'text-cloud-gray')}
            strokeWidth={1.75}
          />
        </button>
      )}
    </div>
  )
}
