import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Camera, Clapperboard, Filter, Search, X } from 'lucide-react'
import {
  formatCurrency,
  getWorkerFinancials,
  getWorkerInTransitAmount,
  getWorkerTaskItems,
  PIPELINE_STATUS_LABELS,
  type PipelineStatus,
  type WorkerTaskItem,
} from '@lingong/shared'
import { AssetEyeIcon } from '@/components/icons/AssetEyeIcon'
import { EmptyState } from '@/components/patterns/EmptyState'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAmountVisible } from '@/lib/amountVisible'
import { getSession } from '@/lib/auth'
import { cn } from '@/lib/utils'

const CURRENT_WORKER = 'w1'

const statusTabs: { value: PipelineStatus | 'all'; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'pendingAccept', label: PIPELINE_STATUS_LABELS.pendingAccept },
  { value: 'inProgress', label: PIPELINE_STATUS_LABELS.inProgress },
  { value: 'revision', label: PIPELINE_STATUS_LABELS.revision },
  { value: 'paymentPending', label: PIPELINE_STATUS_LABELS.paymentPending },
]

const timeOptions = [
  { value: 'all', label: '全部时间', days: null },
  { value: '7d', label: '近7天', days: 7 },
  { value: '30d', label: '近30天', days: 30 },
  { value: '90d', label: '近3个月', days: 90 },
] as const

type TimeFilter = (typeof timeOptions)[number]['value']

const statusBadgeClass: Record<PipelineStatus, string> = {
  pendingAccept: 'bg-mist-gray text-muted-foreground',
  inProgress: 'bg-[#FFF7E6] text-[#D48806]',
  revision: 'bg-[#FFF1F0] text-[#FF4D4F]',
  paymentPending: 'bg-accent text-mint-green',
}

function maskAmount(visible: boolean, amount: number) {
  return visible ? formatCurrency(amount) : '****'
}

function isWithinDays(dateStr: string, days: number, asOf = '2026-10-01') {
  const end = new Date(asOf)
  const start = new Date(asOf)
  start.setDate(start.getDate() - days)
  const d = new Date(dateStr)
  return d >= start && d <= end
}

function formatTaskDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-')
  return `${year}/${month}/${day}`
}

function taskSubtitle(item: WorkerTaskItem) {
  const date = formatTaskDate(item.updatedAt)
  switch (item.pipelineStatus) {
    case 'pendingAccept':
      return `待接单 · ${date}`
    case 'inProgress':
      return `预计 ${date} 交付`
    case 'revision':
      return `修改中 · ${date}`
    case 'paymentPending':
      return `申请到账 · ${date}`
  }
}

function TaskIcon({ item }: { item: WorkerTaskItem }) {
  const Icon = item.kind === 'online' ? Clapperboard : Camera
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist-gray/60 text-ink-black/70">
      <Icon className="h-5 w-5" strokeWidth={1.75} />
    </span>
  )
}

function SummaryCard({
  label,
  amount,
  visible,
  onToggle,
}: {
  label: string
  amount: number
  visible: boolean
  onToggle: () => void
}) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#3BA3FF] to-[#1677FF] p-4 text-paper-white shadow-[0_8px_20px_rgba(43,155,255,0.25)]">
      <p className="text-2xl font-semibold tabular-nums tracking-tight">{maskAmount(visible, amount)}</p>
      <div className="mt-2 flex items-center gap-1">
        <span className="text-xs text-paper-white/85">{label}</span>
        <button
          type="button"
          className="inline-flex text-paper-white/80 transition-opacity duration-200 active:opacity-60"
          onClick={onToggle}
          aria-label={visible ? '隐藏金额' : '显示金额'}
        >
          <AssetEyeIcon visible={visible} className="text-paper-white/80" />
        </button>
      </div>
    </div>
  )
}

function TaskListCard({ item }: { item: WorkerTaskItem }) {
  const muted = item.pipelineStatus === 'paymentPending'

  return (
    <Link
      to={item.detailPath}
      className="flex items-start gap-3 rounded-2xl bg-paper-white p-3.5 shadow-[0_4px_16px_rgba(29,33,41,0.04)] transition-colors duration-200 active:bg-mist-gray/30"
    >
      <TaskIcon item={item} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className={cn('line-clamp-2 font-medium leading-snug', muted && 'text-muted-foreground')}>
            {item.title}
          </p>
          <p className={cn('shrink-0 text-sm font-semibold tabular-nums', muted && 'text-muted-foreground')}>
            {formatCurrency(item.commissionBase)}
          </p>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{taskSubtitle(item)}</p>
        <div className="mt-2 flex justify-end">
          <span
            className={cn(
              'rounded-md px-2 py-0.5 text-[11px] font-medium',
              statusBadgeClass[item.pipelineStatus],
            )}
          >
            {PIPELINE_STATUS_LABELS[item.pipelineStatus]}
          </span>
        </div>
      </div>
    </Link>
  )
}

export function TasksAllPage() {
  const navigate = useNavigate()
  const session = getSession()
  const [searchParams, setSearchParams] = useSearchParams()
  const statusParam = searchParams.get('status') as PipelineStatus | 'all' | null
  const { visible, toggle } = useAmountVisible()
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all')
  const [searchOpen, setSearchOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [keyword, setKeyword] = useState('')

  const statusFilter: PipelineStatus | 'all' =
    statusParam && statusParam !== 'all' && statusParam in PIPELINE_STATUS_LABELS
      ? statusParam
      : 'all'

  const fin = getWorkerFinancials(CURRENT_WORKER)
  const inTransit = getWorkerInTransitAmount(CURRENT_WORKER)
  const allItems = getWorkerTaskItems(CURRENT_WORKER)

  const filtered = useMemo(() => {
    const timeDays = timeOptions.find((t) => t.value === timeFilter)?.days ?? null
    const q = keyword.trim().toLowerCase()
    return allItems.filter((item) => {
      const statusOk = statusFilter === 'all' || item.pipelineStatus === statusFilter
      const timeOk = timeDays === null || isWithinDays(item.updatedAt, timeDays)
      const searchOk = !q || item.title.toLowerCase().includes(q)
      return statusOk && timeOk && searchOk
    })
  }, [allItems, statusFilter, timeFilter, keyword])

  const setStatusFilter = (value: PipelineStatus | 'all') => {
    if (value === 'all') {
      searchParams.delete('status')
      setSearchParams(searchParams)
    } else {
      setSearchParams({ status: value })
    }
  }

  return (
    <div className="min-h-full bg-[#F7F8FA] pb-4">
      <div className="sticky top-0 z-10 bg-[#F7F8FA]">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold">我的任务</h1>
          </div>
          <span className="rounded-full bg-paper-white px-2.5 py-1 text-[11px] text-muted-foreground shadow-[var(--shadow-sm)]">
            {session?.displayName ?? '默认账号'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 px-4 pb-3">
          <SummaryCard label="可提现余额" amount={fin.withdrawable} visible={visible} onToggle={toggle} />
          <SummaryCard label="在途金额" amount={inTransit} visible={visible} onToggle={toggle} />
        </div>

        <div className="flex items-center gap-2 px-4 pb-3">
          <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {statusTabs.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setStatusFilter(value)}
                className={cn(
                  'shrink-0 rounded-full px-3.5 py-1.5 text-xs transition-colors duration-200',
                  statusFilter === value
                    ? 'bg-brand-blue font-medium text-white'
                    : 'bg-paper-white text-muted-foreground',
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setFilterOpen((v) => !v)
              setSearchOpen(false)
            }}
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper-white text-muted-foreground transition-colors duration-200',
              filterOpen && 'text-mint-green',
            )}
            aria-label="筛选"
          >
            <Filter className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchOpen((v) => !v)
              setFilterOpen(false)
            }}
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper-white text-muted-foreground transition-colors duration-200',
              searchOpen && 'text-mint-green',
            )}
            aria-label="搜索"
          >
            <Search className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        {filterOpen && (
          <div className="flex flex-wrap gap-2 px-4 pb-3">
            {timeOptions.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setTimeFilter(value)}
                className={cn(
                  'rounded-full border px-3 py-1 text-xs transition-colors duration-200',
                  timeFilter === value
                    ? 'border-mint-green/40 bg-accent font-medium text-mint-green'
                    : 'border-border bg-paper-white text-muted-foreground',
                )}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {searchOpen && (
          <div className="relative px-4 pb-3">
            <Search className="absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="搜索任务名称"
              className="h-9 bg-paper-white pl-9 pr-9"
            />
            {keyword && (
              <button
                type="button"
                onClick={() => setKeyword('')}
                className="absolute right-7 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-label="清除搜索"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="space-y-3 px-3">
        {filtered.length === 0 ? (
          <EmptyState title="暂无符合条件的任务" description="试试调整筛选条件" />
        ) : (
          filtered.map((item) => <TaskListCard key={`${item.kind}-${item.id}`} item={item} />)
        )}
      </div>
    </div>
  )
}
