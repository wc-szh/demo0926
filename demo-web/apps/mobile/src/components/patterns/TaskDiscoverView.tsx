import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import {
  BookOpen,
  ChevronRight,
  Clapperboard,
  HelpCircle,
  Search,
  Sparkles,
} from 'lucide-react'
import {
  formatCurrency,
  homeAnnouncements,
  taskHallEarnings,
  offlineJobs,
  workers,
  type OfflineJob,
  type Worker,
} from '@lingong/shared'
import { AssetEyeIcon } from '@/components/icons/AssetEyeIcon'
import { EmptyState } from '@/components/patterns/EmptyState'
import {
  jobMatchesTaskHallCategory,
  TaskHallCategoryTabs,
  type TaskHallCategoryKey,
} from '@/components/patterns/TaskHallCategoryTabs'
import { TaskHallFeedCard } from '@/components/patterns/TaskHallFeedCard'
import { TaskHallSectionHeader } from '@/components/patterns/TaskHallSectionHeader'
import { WorkerAvatar } from '@/components/patterns/WorkerAvatar'
import { getDefaultAvatarSrc } from '@/lib/workerAvatar'
import { isTaskFollowed, toggleFollowedTask } from '@/lib/followedTasks'
import { useAmountVisible } from '@/lib/amountVisible'
import { countInProgressWork, countPendingConfirm } from '@/lib/workItems'
import { cn } from '@/lib/utils'

const CURRENT_WORKER = 'w1'

function maskName(name: string, isMe: boolean) {
  if (isMe) return '你'
  return `${name.slice(0, 1)}**`
}

const RANK_DIGIT_CLASS = [
  'text-brand-blue',
  'text-[#F59E0B]',
  'text-[#FB7185]',
] as const

function formatLeaderboardEarnings(amount: number) {
  const value =
    amount >= 1000
      ? amount.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
      : amount.toFixed(1)
  return `收益·${value}元`
}

function myRankLabel(rank: number) {
  if (rank <= 0 || rank > 99) return '您当前排名999+'
  return `您当前排名第 ${rank}`
}

export function TaskDiscoverView() {
  const [query, setQuery] = useState('')
  const [categoryTab, setCategoryTab] = useState<TaskHallCategoryKey>('live')
  const [followVersion, setFollowVersion] = useState(0)
  const pending = countPendingConfirm(CURRENT_WORKER)
  const mine = countInProgressWork(CURRENT_WORKER)
  const { visible, toggle } = useAmountVisible()
  const announcement = homeAnnouncements[1]

  const publicJobs = useMemo(
    () => offlineJobs.filter((j) => j.dispatchMode === 'PUBLIC_APPLY' && j.status === 'PUBLISHED'),
    [],
  )

  const featured = useMemo(
    () => [...publicJobs].sort((a, b) => b.commissionBase - a.commissionBase)[0],
    [publicJobs],
  )

  const ranking = useMemo(
    () => [...workers].sort((a, b) => b.totalCommission - a.totalCommission).slice(0, 3),
    [],
  )

  const filtered = useMemo(() => {
    void followVersion
    const q = query.trim()
    let list = [...publicJobs].filter((j) => jobMatchesTaskHallCategory(j, categoryTab))
    list.sort((a, b) => b.commissionBase - a.commissionBase)
    if (q) list = list.filter((j) => j.title.includes(q) || j.description.includes(q))
    return list
  }, [publicJobs, categoryTab, query, followVersion])

  const myRank = useMemo(() => {
    const sorted = [...workers].sort((a, b) => b.totalCommission - a.totalCommission)
    return sorted.findIndex((w) => w.id === CURRENT_WORKER) + 1
  }, [])

  const me = useMemo(() => workers.find((w) => w.id === CURRENT_WORKER), [])

  return (
    <div className="relative min-h-full overflow-hidden bg-page pb-6">
      <div
        className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-[#7AD4FF]/50 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-6 top-8 h-28 w-28 rounded-full bg-[#FFD56A]/40 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-12 top-24 h-36 w-36 rounded-full bg-brand-blue/25 blur-2xl"
        aria-hidden
      />

      <div className="relative flex items-center gap-2 px-3 pb-3 pt-4">
        <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-md bg-paper-white px-3.5 text-sm shadow-[0_4px_16px_rgba(29,33,41,0.04)]">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索你想做的任务"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </label>
        <Link
          to="/settings"
          className="flex h-10 shrink-0 items-center gap-1 rounded-md bg-gradient-to-r from-brand-blue to-brand-blue-deep px-3 text-xs font-medium text-white active:opacity-90"
        >
          <BookOpen className="h-3.5 w-3.5" />
          成片规范
        </Link>
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-paper-white text-brand-blue shadow-[0_4px_16px_rgba(29,33,41,0.04)] active:opacity-80"
          aria-label="帮助"
          onClick={() =>
            toast.info(announcement?.title ?? '帮助', {
              description: announcement?.description ?? '可在消息中心查看平台公告',
            })
          }
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <div className="relative grid grid-cols-2 gap-2.5 px-3">
        {featured && <FeaturedCard job={featured} />}

        <WeeklyLeaderboardCard ranking={ranking} myRank={myRank} me={me} />

        <div className="rounded-lg bg-gradient-to-b from-profile-sky to-paper-white px-3 py-2.5 shadow-[0_4px_16px_rgba(29,33,41,0.04)]">
          <div className="flex items-center gap-1">
            <p className="text-[12px] leading-none text-[#4e5969]">本月收益(元)</p>
            <button
              type="button"
              className="inline-flex text-muted-foreground transition-opacity duration-200 active:opacity-60"
              onClick={toggle}
              aria-label={visible ? '隐藏金额' : '显示金额'}
            >
              <AssetEyeIcon visible={visible} />
            </button>
          </div>
          <Link to="/wallet" className="mt-1.5 block active:opacity-90">
            <p className="text-[26px] font-semibold leading-none tabular-nums tracking-tight text-ink-black">
              {visible ? taskHallEarnings.month.toFixed(2) : '******'}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <p className="text-[10px] leading-none text-muted-foreground">今日预估</p>
                <p className="mt-1 text-[13px] font-medium tabular-nums text-mint-green">
                  {visible ? `+${taskHallEarnings.todayEstimate.toFixed(2)}` : '****'}
                </p>
              </div>
              <div>
                <p className="text-[10px] leading-none text-muted-foreground">昨日预估</p>
                <p className="mt-1 text-[13px] font-medium tabular-nums text-mint-green">
                  {visible ? `+${taskHallEarnings.yesterdayEstimate.toFixed(2)}` : '****'}
                </p>
              </div>
            </div>
          </Link>
        </div>

        <Link
          to="/tasks/mine"
          className="relative overflow-hidden rounded-lg bg-gradient-to-br from-brand-blue via-brand-blue-deep to-[#A78BFA] p-3.5 text-white active:opacity-90"
        >
          <Sparkles className="absolute -right-1 -top-1 h-16 w-16 text-white/15" />
          <p className="text-[15px] font-semibold">我的任务</p>
          <p className="mt-2 text-xs text-white/85">
            进行中 {mine}
            <span className="mx-1.5 text-white/40">|</span>
            待确认 {pending}
          </p>
          <span className="mt-3 inline-flex rounded-md bg-white/20 px-2.5 py-1 text-[11px]">去看看</span>
        </Link>

        <button
          type="button"
          onClick={() => toast.info('邀请功能即将上线', { description: '邀请好友加入拾影，最高得 200 元奖励' })}
          className="relative min-h-[96px] overflow-hidden rounded-lg bg-gradient-to-r from-[#7AD4FF] via-brand-blue to-brand-blue-deep p-3.5 text-left active:opacity-90"
        >
          <InviteRings />
          <p className="relative text-[17px] font-semibold leading-none text-white">邀请好友</p>
          <p className="relative mt-2 text-[12px] leading-none text-white/90">做任务赚收益</p>
        </button>

        <Link
          to="/settings"
          className="relative overflow-hidden rounded-lg bg-gradient-to-br from-profile-sky to-mist-gray p-3 active:opacity-90"
        >
          <span className="pointer-events-none absolute -bottom-2 -right-1 text-[40px] font-semibold leading-none text-brand-blue/15">
            日
          </span>
          <p className="relative text-[15px] font-semibold leading-none text-ink-black">推广账号</p>
          <p className="relative mt-2 text-[12px] leading-none text-muted-foreground">账号管理</p>
        </Link>

        <Link
          to="/style-guide"
          className="relative overflow-hidden rounded-lg bg-announce p-3 active:opacity-90"
        >
          <span className="absolute right-2 top-2 rounded-sm bg-[#FB7185] px-1 py-px text-[9px] font-semibold leading-none text-white">
            NEW
          </span>
          <p className="relative text-[15px] font-semibold leading-none text-ink-black">新手必看</p>
          <p className="relative mt-2 text-[12px] leading-none text-muted-foreground">推广课程</p>
        </Link>
      </div>

      <div className="relative mt-5 px-3">
        <TaskHallSectionHeader />
        <TaskHallCategoryTabs value={categoryTab} onChange={setCategoryTab} />
        {filtered.length === 0 ? (
          <div className="mt-3 rounded-lg bg-paper-white p-6 shadow-[0_4px_16px_rgba(29,33,41,0.04)]">
            <EmptyState title={query ? '没有匹配的任务' : '该分类暂无开放任务'} />
          </div>
        ) : (
          <ul className="mt-3 space-y-2.5">
            {filtered.map((job) => {
              const followed = isTaskFollowed(job.id)
              return (
                <li key={job.id}>
                  <TaskHallFeedCard
                    job={job}
                    followed={followed}
                    onToggleFollow={() => {
                      const next = toggleFollowedTask(job.id)
                      toast.success(next ? '已加入关注' : '已取消关注')
                      setFollowVersion((v) => v + 1)
                    }}
                  />
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

function WeeklyLeaderboardCard({
  ranking,
  myRank,
  me,
}: {
  ranking: Worker[]
  myRank: number
  me?: Worker
}) {
  return (
    <Link
      to="/profile"
      className="relative flex min-h-[196px] flex-col overflow-hidden rounded-lg bg-paper-white shadow-[0_4px_16px_rgba(29,33,41,0.04)] active:opacity-95"
    >
      <div
        className="pointer-events-none absolute -left-8 -top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(43,155,255,0.2)_0%,rgba(255,255,255,0)_70%)]"
        aria-hidden
      />
      <p
        className="pointer-events-none absolute right-1 top-2 select-none text-[26px] font-medium italic leading-none text-profile-sky"
        aria-hidden
      >
        Weekly
      </p>

      <div className="relative px-3 pt-3 pb-1">
        <h3 className="text-[15px] font-bold leading-tight text-brand-blue-deep">本周高手榜</h3>
      </div>

      <ul className="relative flex-1 space-y-2 px-3 pt-1">
        {ranking.map((w, i) => (
          <li key={w.id} className="flex items-center gap-2">
            <span
              className={cn(
                'w-[14px] shrink-0 text-center text-[17px] font-bold tabular-nums leading-none',
                RANK_DIGIT_CLASS[i] ?? 'text-muted-foreground',
              )}
            >
              {i + 1}
            </span>
            <WorkerAvatar
              src={getDefaultAvatarSrc(w.gender)}
              alt=""
              className="h-8 w-8 shrink-0 ring-1 ring-black/[0.04]"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium leading-tight text-ink-black">
                {maskName(w.displayName, w.id === CURRENT_WORKER)}
              </p>
              <p className="mt-0.5 truncate text-[11px] leading-tight text-muted-foreground">
                {formatLeaderboardEarnings(w.totalCommission)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div
        className="relative mx-2.5 mb-2.5 mt-2 flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue via-brand-blue-deep to-[#A78BFA] px-2.5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
      >
        <WorkerAvatar
          src={getDefaultAvatarSrc(me?.gender ?? 'male')}
          alt=""
          className="h-6 w-6 shrink-0 ring-2 ring-white/35"
        />
        <p className="min-w-0 flex-1 text-[11px] font-medium leading-none text-white">
          {myRankLabel(myRank)}
        </p>
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-brand-blue-deep shadow-sm"
          aria-hidden
        >
          <ChevronRight className="h-3.5 w-3.5 stroke-[2.5]" />
        </span>
      </div>
    </Link>
  )
}

function InviteRings() {
  return (
    <svg
      className="pointer-events-none absolute -right-2 -top-1 h-[86px] w-[86px]"
      viewBox="0 0 86 86"
      fill="none"
      aria-hidden
    >
      <ellipse
        cx="34"
        cy="42"
        rx="18"
        ry="24"
        transform="rotate(-32 34 42)"
        stroke="url(#ringStrokeA)"
        strokeWidth="9"
      />
      <ellipse
        cx="54"
        cy="46"
        rx="18"
        ry="24"
        transform="rotate(28 54 46)"
        stroke="url(#ringStrokeB)"
        strokeWidth="9"
      />
      <ellipse
        cx="34"
        cy="42"
        rx="18"
        ry="24"
        transform="rotate(-32 34 42)"
        stroke="#F3FCFF"
        strokeWidth="2.5"
        opacity="0.7"
      />
      <defs>
        <linearGradient id="ringStrokeA" x1="16" y1="18" x2="52" y2="66">
          <stop stopColor="#E7F9FF" />
          <stop offset="0.45" stopColor="#6ED0F8" />
          <stop offset="1" stopColor="#1EA0D8" />
        </linearGradient>
        <linearGradient id="ringStrokeB" x1="36" y1="22" x2="72" y2="70">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.4" stopColor="#8FE0FF" />
          <stop offset="1" stopColor="#2BB4EA" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function FeaturedCard({ job }: { job: OfflineJob }) {
  return (
    <Link
      to={`/tasks/${job.id}`}
      className="row-span-2 relative flex min-h-[220px] flex-col overflow-hidden rounded-lg bg-gradient-to-br from-brand-blue-deep via-brand-blue to-[#7AD4FF] p-3 shadow-[0_4px_16px_rgba(29,33,41,0.08)] active:opacity-95"
    >
      <Clapperboard className="absolute -right-3 top-8 h-24 w-24 text-white/20" strokeWidth={1.15} />
      <div className="relative flex items-start justify-between">
        <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold text-white">
          今日推荐
        </span>
        <span className="rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-medium text-brand-blue-deep">
          实拍
        </span>
      </div>
      <p className="relative mt-auto text-[15px] font-semibold leading-snug text-white">
        {job.title}
      </p>
      <p className="relative mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-white/80">
        {job.description}
      </p>
      <p className="relative mt-2 text-sm font-semibold tabular-nums text-white">
        {formatCurrency(job.commissionBase)}
      </p>
    </Link>
  )
}
