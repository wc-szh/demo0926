import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ClipboardList, LayoutGrid, Settings } from 'lucide-react'
import { AnnouncementMegaphoneIcon } from '@/components/icons/AnnouncementMegaphoneIcon'
import { homeAnnouncements, offlineJobs, workers } from '@lingong/shared'
import homePoster from '@/assets/aLtHIGyA.jfif'
import { WorkerAvatar } from '@/components/patterns/WorkerAvatar'
import { getSession } from '@/lib/auth'
import { countInProgressWork, countPendingConfirm } from '@/lib/workItems'
import { resolveAvatarSrc } from '@/lib/workerAvatar'
import { createWorkerProfileDefaults, loadWorkerProfile } from '@/lib/workerProfile'
import { cn } from '@/lib/utils'

const CURRENT_WORKER = 'w1'

function BentoTile({
  className,
  children,
  to,
  onClick,
}: {
  className?: string
  children: React.ReactNode
  to?: string
  onClick?: () => void
}) {
  const base = cn(
    'relative overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(15,23,42,0.06)] transition-transform duration-200 active:scale-[0.98]',
    className,
  )
  if (to) {
    return (
      <Link to={to} className={base}>
        {children}
      </Link>
    )
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cn(base, 'text-left')}>
        {children}
      </button>
    )
  }
  return <div className={base}>{children}</div>
}

export function HomePage() {
  const session = getSession()
  const worker = workers.find((w) => w.id === CURRENT_WORKER)!
  const profile = loadWorkerProfile(createWorkerProfileDefaults(worker))
  const avatarSrc = resolveAvatarSrc(profile, worker.gender)
  const displayName = profile.displayName || session?.displayName || '兼职用户'

  const counts = useMemo(
    () => ({
      public: offlineJobs.filter((j) => j.dispatchMode === 'PUBLIC_APPLY' && j.status === 'PUBLISHED').length,
      pending: countPendingConfirm(CURRENT_WORKER),
      mine: countInProgressWork(CURRENT_WORKER),
    }),
    [],
  )

  const [featuredAnnouncement, ...moreAnnouncements] = homeAnnouncements

  return (
    <div className="min-h-full bg-[#F2F4F7] pb-8">
      <header className="bg-gradient-to-b from-[#E8F1F8] via-[#EEF3F7] to-[#F2F4F7] px-4 pb-3 pt-4">
        <div className="flex items-start gap-3">
          <Link to="/settings" className="shrink-0 active:opacity-80">
            <WorkerAvatar src={avatarSrc} alt={displayName} className="h-12 w-12 ring-2 ring-white/90" />
          </Link>
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-[11px] font-medium tracking-wide text-muted-foreground/90">拾影 · 工作台</p>
            <h1 className="mt-0.5 text-[20px] font-semibold leading-tight tracking-tight">Hi，{displayName}</h1>
            <Link
              to="/settings"
              className="mt-1 inline-flex items-center gap-0.5 text-sm text-muted-foreground transition-colors duration-200 active:text-foreground"
            >
              信用分 {worker.creditScore}
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <Link
            to="/settings"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 active:bg-white/60"
            aria-label="设置"
          >
            <Settings className="h-5 w-5" strokeWidth={1.75} />
          </Link>
        </div>
      </header>

      <div className="grid auto-rows-min grid-cols-2 gap-3 px-3.5 pb-2">
        <BentoTile className="col-span-2 p-0">
          <img
            src={homePoster}
            alt="首页活动海报"
            className="aspect-[2.15/1] w-full object-cover object-center"
            decoding="async"
          />
        </BentoTile>

        <BentoTile to="/tasks/assigned" className="p-3.5">
          <p className="text-xs text-muted-foreground">待确认</p>
          <p
            className={cn(
              'mt-1 text-[32px] font-semibold tabular-nums leading-none',
              counts.pending > 0 ? 'text-[#FF4D4F]' : 'text-foreground',
            )}
          >
            {counts.pending}
          </p>
          <p className="mt-2 text-[11px] leading-snug text-muted-foreground">指派 · AI 视频待接单</p>
        </BentoTile>

        <BentoTile to="/tasks/mine" className="p-3.5">
          <p className="text-xs text-muted-foreground">进行中</p>
          <p
            className={cn(
              'mt-1 text-[32px] font-semibold tabular-nums leading-none',
              counts.mine > 0 ? 'text-[#FF4D4F]' : 'text-foreground',
            )}
          >
            {counts.mine}
          </p>
          <p className="mt-2 text-[11px] leading-snug text-muted-foreground">实拍 · AI 视频履约</p>
        </BentoTile>

        <BentoTile to="/tasks/public" className="row-span-2 flex flex-col p-3.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#EAF3FF] text-[#1677FF]">
            <ClipboardList className="h-5 w-5" strokeWidth={1.85} />
          </span>
          <p className="mt-auto pt-6 text-[15px] font-semibold leading-tight">任务大厅</p>
          <p className="mt-1 text-xs text-muted-foreground">公开任务可申请</p>
          {counts.public > 0 && (
            <span className="absolute right-3 top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FF4D4F] px-1.5 text-[10px] font-semibold text-white">
              {counts.public > 9 ? '9+' : counts.public}
            </span>
          )}
        </BentoTile>

        {featuredAnnouncement && (
          <BentoTile className="flex min-h-[108px] flex-col p-3.5">
            <div className="flex items-center gap-1.5">
              <AnnouncementMegaphoneIcon className="h-4 w-4 shrink-0" />
              <span className="text-[11px] font-medium text-muted-foreground">平台公告</span>
            </div>
            <span className="mt-2 inline-flex w-fit rounded-md bg-[#FFF1F0] px-1.5 py-0.5 text-[10px] font-semibold text-[#FF4D4F]">
              {featuredAnnouncement.tag}
            </span>
            <p className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug">{featuredAnnouncement.title}</p>
          </BentoTile>
        )}

        <BentoTile to="/tasks/all" className="flex min-h-[108px] flex-col justify-between p-3.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5F7FA] text-ink-black/75">
            <LayoutGrid className="h-[18px] w-[18px]" strokeWidth={1.85} />
          </span>
          <div>
            <p className="text-sm font-semibold">全部任务</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">按状态筛选</p>
          </div>
        </BentoTile>

        {moreAnnouncements[0] ? (
          <BentoTile className="col-span-2 p-3.5">
            <div className="flex items-start gap-2.5">
              <span className="shrink-0 rounded-md bg-[#F5F7FA] px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                {moreAnnouncements[0].tag}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-snug">{moreAnnouncements[0].title}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {moreAnnouncements[0].description}
                </p>
              </div>
            </div>
          </BentoTile>
        ) : null}
      </div>
    </div>
  )
}
