import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { ChevronRight, Gift, Settings } from 'lucide-react'
import type { Level } from '@lingong/shared'
import { WorkerAvatar } from '@/components/patterns/WorkerAvatar'
import { cn } from '@/lib/utils'

interface ProfileHeaderSectionProps {
  displayName: string
  avatarSrc: string
  creditScore: number
  level: Level | undefined
  completedTaskCount: number
}

function LevelBadge({ level }: { level: Level }) {
  return (
    <span
      className="inline-flex h-5 items-center rounded-sm bg-ink-black px-1.5 text-[10px] font-semibold text-amber-200"
      aria-label={`等级 Lv.${level.sortOrder}`}
    >
      Lv.{level.sortOrder}
    </span>
  )
}

export function ProfileHeaderSection({
  displayName,
  avatarSrc,
  creditScore,
  level,
  completedTaskCount,
}: ProfileHeaderSectionProps) {
  return (
    <div className="px-4 pb-2 pt-4">
      <div className="mb-3 flex items-start gap-3">
        <WorkerAvatar src={avatarSrc} className="h-[52px] w-[52px] shrink-0" alt={displayName} />
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-semibold tracking-tight">Hi，{displayName}</h1>
          <Link
            to="/settings"
            className="mt-1 inline-flex items-center gap-0.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            信用分{creditScore}
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <Link
          to="/settings"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-paper-white/60"
          aria-label="设置"
        >
          <Settings className="h-5 w-5" />
        </Link>
      </div>

      <Link
        to="/settings"
        className={cn(
          'block overflow-hidden rounded-2xl',
          'bg-gradient-to-r from-amber-50 via-orange-50/80 to-amber-50',
          'border border-amber-100/80',
          'transition-opacity duration-200 active:opacity-90',
        )}
      >
        <div className="flex items-center gap-2 px-3.5 py-3">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="shrink-0 text-sm font-semibold text-ink-black">创作者时光计划</span>
            {level && <LevelBadge level={level} />}
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        </div>
        <p className="border-t border-amber-100/60 px-3.5 py-2 text-xs leading-relaxed text-muted-foreground">
          已完成 {completedTaskCount} 单任务，{level?.name ?? '初级'}等级享 +{level?.bonusPercent ?? 0}% 提成加成
        </p>
      </Link>

      <button
        type="button"
        className="mt-2 flex w-full items-center justify-between rounded-2xl border border-paper-white/80 bg-paper-white/90 px-3.5 py-3 text-left shadow-sm backdrop-blur-sm transition-colors duration-200 active:bg-paper-white"
        onClick={() => toast.info('邀请功能即将上线')}
      >
        <span className="flex items-center gap-2 text-sm">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive/10">
            <Gift className="h-3.5 w-3.5 text-destructive" />
          </span>
          邀请好友加入拾影
        </span>
        <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
          最高得200元奖励
          <ChevronRight className="h-3.5 w-3.5" />
        </span>
      </button>
    </div>
  )
}
