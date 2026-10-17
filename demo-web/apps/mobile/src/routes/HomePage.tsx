import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Clapperboard, Sparkles, Star, Timer, UserCheck, Wallet } from 'lucide-react'
import { homeReferences, offlineJobs, type OfflineJob } from '@lingong/shared'
import { HomeFeatureRow } from '@/components/patterns/HomeFeatureRow'
import { HomeHeroBanner } from '@/components/patterns/HomeHeroBanner'
import { HomeToolGrid } from '@/components/patterns/HomeToolGrid'
import { cn } from '@/lib/utils'
import { countPendingConfirm } from '@/lib/workItems'

const CURRENT_WORKER = 'w1'

type FeedTab = 'jobs' | 'refs'

const COVER: Record<string, string> = {
  live: 'from-brand-blue to-brand-blue-deep',
  store: 'from-[#FB7185] to-[#F59E0B]',
  event: 'from-[#A78BFA] to-brand-blue-deep',
  edit: 'from-[#7AD4FF] to-brand-blue',
  ai: 'from-brand-blue-deep to-[#A78BFA]',
}

const REF_TONE: Record<(typeof homeReferences)[number]['tone'], string> = {
  blue: 'from-brand-blue to-brand-blue-deep',
  mint: 'from-[#7ED9B8] to-brand-blue',
  warm: 'from-[#FB7185] to-[#F59E0B]',
  violet: 'from-[#A78BFA] to-[#7C5CFF]',
}

function jobCoverKey(job: OfflineJob) {
  const text = `${job.title}${job.description}`
  if (/动画|AI|二维|AE/.test(text)) return 'ai'
  if (/探店|开箱|门店/.test(text)) return 'store'
  if (/活动|展会|纪实/.test(text)) return 'event'
  if (/精剪|Vlog|素材/.test(text)) return 'edit'
  return 'live'
}

export function HomePage() {
  const [query, setQuery] = useState('')
  const [feedTab, setFeedTab] = useState<FeedTab>('jobs')
  const pending = countPendingConfirm(CURRENT_WORKER)

  const publicJobs = useMemo(
    () =>
      [...offlineJobs]
        .filter((j) => j.dispatchMode === 'PUBLIC_APPLY' && j.status === 'PUBLISHED')
        .sort((a, b) => b.commissionBase - a.commissionBase),
    [],
  )

  const hotJobs = useMemo(() => {
    const q = query.trim()
    let list = publicJobs
    if (q) list = list.filter((j) => j.title.includes(q) || j.description.includes(q))
    return list.slice(0, 6)
  }, [publicJobs, query])

  const refs = useMemo(() => {
    const q = query.trim()
    if (!q) return homeReferences
    return homeReferences.filter((item) => item.title.includes(q) || item.hint.includes(q))
  }, [query])

  return (
    <div className="min-h-full bg-page pb-6">
      <HomeHeroBanner query={query} onQueryChange={setQuery} onSearch={() => setFeedTab('jobs')}>
        <HomeFeatureRow
          items={[
            {
              to: '/tasks/assigned',
              label: '待确认',
              icon: UserCheck,
              tone: 'from-[#5AA8FF] to-[#2B7FFF]',
              badge: pending,
            },
            {
              to: '/tasks/mine',
              label: '进行中',
              icon: Timer,
              tone: 'from-[#3B9BFF] to-[#1D6FE8]',
            },
            {
              to: '/tasks/public',
              label: '公开任务',
              icon: Clapperboard,
              tone: 'from-[#A78BFA] to-[#7C5CFF]',
            },
          ]}
        />
      </HomeHeroBanner>

      <div className="relative z-10 -mt-2 rounded-t-[24px] bg-paper-white px-3 pb-4 pt-4 shadow-[0_-8px_24px_rgba(43,155,255,0.06)]">
        <HomeToolGrid
          items={[
            { to: '/follow', label: '关注', icon: Star, tone: 'bg-[#F59E0B]' },
            { to: '/wallet', label: '钱包', icon: Wallet, tone: 'bg-[#A78BFA]' },
            { to: '/settings', label: '成片规范', icon: BookOpen, tone: 'bg-brand-blue' },
            { to: '/style-guide', label: '新手指南', icon: Sparkles, tone: 'bg-[#FB7185]' },
          ]}
        />
      </div>

      <section className="px-3 pt-4">
        <div className="flex items-end gap-4">
          <button
            type="button"
            onClick={() => setFeedTab('jobs')}
            className={cn(
              'text-[17px] font-bold leading-tight',
              feedTab === 'jobs' ? 'text-ink-black' : 'text-muted-foreground',
            )}
          >
            热门任务
          </button>
          <button
            type="button"
            onClick={() => setFeedTab('refs')}
            className={cn(
              'text-[17px] font-bold leading-tight',
              feedTab === 'refs' ? 'text-ink-black' : 'text-muted-foreground',
            )}
          >
            成片参考
          </button>
          <Link to="/tasks/public" className="ml-auto pb-0.5 text-[13px] text-muted-foreground active:opacity-80">
            全部
          </Link>
        </div>

        {feedTab === 'jobs' ? (
          hotJobs.length === 0 ? (
            <p className="mt-8 text-center text-sm text-muted-foreground">{query ? '没有匹配的任务' : '暂无公开任务'}</p>
          ) : (
            <ul className="mt-3 grid grid-cols-2 gap-2.5">
              {hotJobs.map((job) => (
                <li key={job.id}>
                  <Link
                    to={`/tasks/${job.id}`}
                    className="block overflow-hidden rounded-[16px] bg-paper-white shadow-[0_4px_16px_rgba(29,33,41,0.04)] active:opacity-90"
                  >
                    <div
                      className={cn(
                        'flex h-[88px] items-center justify-center bg-gradient-to-br',
                        COVER[jobCoverKey(job)],
                      )}
                    >
                      <Clapperboard className="h-8 w-8 text-white/40" strokeWidth={1.3} />
                    </div>
                    <p className="line-clamp-2 px-2.5 py-2 text-[13px] font-semibold leading-snug text-ink-black">
                      {job.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )
        ) : refs.length === 0 ? (
          <p className="mt-8 text-center text-sm text-muted-foreground">没有匹配的成片参考</p>
        ) : (
          <ul className="mt-3 grid grid-cols-2 gap-2.5">
            {refs.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.to}
                  className="block overflow-hidden rounded-[16px] bg-paper-white shadow-[0_4px_16px_rgba(29,33,41,0.04)] active:opacity-90"
                >
                  <div className={cn('flex h-[88px] items-center justify-center bg-gradient-to-br', REF_TONE[item.tone])}>
                    <Sparkles className="h-8 w-8 text-white/40" strokeWidth={1.3} />
                  </div>
                  <div className="px-2.5 py-2">
                    <p className="line-clamp-1 text-[13px] font-semibold text-ink-black">{item.title}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{item.hint}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
