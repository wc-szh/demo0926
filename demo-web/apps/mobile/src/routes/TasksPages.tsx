import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { formatCurrency, formatPercent, offlineJobs, onlineOrders } from '@lingong/shared'
import { EmptyState } from '@/components/patterns/EmptyState'
import { MobilePageShell } from '@/components/patterns/MobilePageShell'
import { StatusBadge } from '@/components/patterns/StatusBadge'
import { TaskJobCard } from '@/components/patterns/TaskJobCard'
import { WorkItemCard } from '@/components/patterns/WorkItemCard'
import { Button } from '@/components/ui/button'
import {
  addFollowedTask,
  isTaskFollowed,
  removeFollowedTask,
  toggleFollowedTask,
} from '@/lib/followedTasks'
import {
  countInProgressWork,
  countPendingConfirm,
  getAssignedWorkItems,
  getMineWorkItems,
  workItemId,
} from '@/lib/workItems'
import { cn } from '@/lib/utils'

const CURRENT_WORKER = 'w1'

type HallTab = 'hall' | 'assigned' | 'mine'

const hallTabs: { key: HallTab; label: string }[] = [
  { key: 'hall', label: '任务大厅' },
  { key: 'assigned', label: '待确认' },
  { key: 'mine', label: '进行中' },
]

function useHallJobs(tab: HallTab) {
  return useMemo(() => {
    if (tab === 'hall') {
      return offlineJobs.filter((j) => j.dispatchMode === 'PUBLIC_APPLY' && j.status === 'PUBLISHED')
    }
    return []
  }, [tab])
}

interface TaskHallPageProps {
  defaultTab?: HallTab
  showBack?: boolean
}

function TaskHallPage({ defaultTab = 'hall', showBack = false }: TaskHallPageProps) {
  const navigate = useNavigate()
  const [tab, setTab] = useState<HallTab>(defaultTab)
  const [followVersion, setFollowVersion] = useState(0)
  const hallJobs = useHallJobs(tab)
  const assignedItems = useMemo(() => getAssignedWorkItems(CURRENT_WORKER), [])
  const mineItems = useMemo(() => getMineWorkItems(CURRENT_WORKER), [])

  const stats = useMemo(
    () => ({
      hall: offlineJobs.filter((j) => j.dispatchMode === 'PUBLIC_APPLY' && j.status === 'PUBLISHED').length,
      assigned: countPendingConfirm(CURRENT_WORKER),
      mine: countInProgressWork(CURRENT_WORKER),
    }),
    [],
  )

  const emptyCopy: Record<HallTab, string> = {
    hall: '暂无开放中的公共任务',
    assigned: '暂无待确认的任务',
    mine: '暂无进行中的任务',
  }

  const refreshFollow = () => setFollowVersion((v) => v + 1)

  const listEmpty =
    tab === 'hall' ? hallJobs.length === 0 : tab === 'assigned' ? assignedItems.length === 0 : mineItems.length === 0

  return (
    <MobilePageShell
      title="任务中心"
      subtitle="实拍与 AI 视频任务统一处理，按类型区分"
      headerExtra={
        showBack ? (
          <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        ) : null
      }
    >
      <div className="grid grid-cols-3 gap-2 rounded-2xl border border-border bg-paper-white p-3 shadow-[var(--shadow-card)]">
        {hallTabs.map(({ key, label }) => (
          <div key={key} className="text-center">
            <p className="text-lg font-semibold tabular-nums text-[#FF4D4F]">{stats[key]}</p>
            <p className="text-[10px] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {hallTabs.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={cn(
              'shrink-0 rounded-2xl border px-3 py-1.5 text-xs transition-colors duration-200',
              tab === key
                ? 'border-[#FF4D4F]/40 bg-[#FFF1F0] font-medium text-[#FF4D4F]'
                : 'border-border bg-paper-white text-muted-foreground',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {listEmpty ? (
        <div className="rounded-2xl border border-border bg-paper-white p-6 shadow-[var(--shadow-card)]">
          <EmptyState title={emptyCopy[tab]} />
          {tab !== 'hall' && (
            <Button asChild className="mt-4 w-full" variant="outline">
              <Link to="/tasks/public">去任务大厅</Link>
            </Button>
          )}
        </div>
      ) : tab === 'hall' ? (
        <ul className="space-y-3">
          {hallJobs.map((job) => {
            void followVersion
            const followed = isTaskFollowed(job.id)
            return (
              <li key={job.id}>
                <TaskJobCard
                  job={job}
                  followed={followed}
                  onToggleFollow={() => {
                    const next = toggleFollowedTask(job.id)
                    toast.success(next ? '已加入关注' : '已取消关注')
                    refreshFollow()
                  }}
                  actions={
                    <Button size="sm" onClick={() => toast.success('申请已提交')}>
                      申请任务
                    </Button>
                  }
                />
              </li>
            )
          })}
        </ul>
      ) : (
        <ul className="space-y-3">
          {(tab === 'assigned' ? assignedItems : mineItems).map((item) => (
            <li key={workItemId(item)}>
              <WorkItemCard
                item={item}
                actions={
                  tab === 'assigned' ? (
                    <>
                      <Button size="sm" onClick={() => toast.success('已接受任务')}>
                        接受
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => toast.success('已拒绝')}>
                        拒绝
                      </Button>
                    </>
                  ) : item.kind === 'offline' ? (
                    <Button size="sm" variant="outline" onClick={() => toast.success('完结申请已提交')}>
                      申请完结
                    </Button>
                  ) : !item.data.workerCompletionRequested ? (
                    <Button size="sm" variant="outline" onClick={() => toast.success('完结申请已提交')}>
                      申请完结
                    </Button>
                  ) : null
                }
              />
            </li>
          ))}
        </ul>
      )}
    </MobilePageShell>
  )
}

export function TasksPublicPage() {
  return <TaskHallPage defaultTab="hall" />
}

export function TasksAssignedPage() {
  return <TaskHallPage defaultTab="assigned" showBack />
}

export function TasksMinePage() {
  return <TaskHallPage defaultTab="mine" showBack />
}

export function TaskDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const job = offlineJobs.find((j) => j.id === id)
  const order = onlineOrders.find((o) => o.id === id)
  const [followed, setFollowed] = useState(() => (id ? isTaskFollowed(id) : false))

  if (!job && !order) {
    return (
      <div className="min-h-full bg-gradient-to-b from-profile-sky to-profile-gray p-4">
        <EmptyState title="任务不存在" />
      </div>
    )
  }

  if (order) {
    return (
      <div className="min-h-full bg-gradient-to-b from-profile-sky to-profile-gray pb-4">
        <div className="flex items-center gap-2 px-4 py-3">
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-base font-semibold">任务详情</h1>
        </div>
        <div className="space-y-3 px-3">
          <div className="rounded-2xl border border-border bg-paper-white p-4 shadow-[var(--shadow-card)]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-sm bg-mist-gray px-1.5 py-0.5 text-[10px] text-muted-foreground">AI 视频</span>
              <StatusBadge status={order.status} />
            </div>
            <h2 className="mt-3 text-lg font-semibold leading-snug">{order.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{order.externalOrderNo}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-mist-gray/35 p-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">提成基数</p>
                <p className="mt-1 font-semibold tabular-nums">{formatCurrency(order.commissionBase)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">提成比例</p>
                <p className="mt-1 font-semibold">{formatPercent(order.finalRate)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">交易状态</p>
                <p className="mt-1 font-medium">{order.transactionCompleted ? '交易已完成' : '交易未完成'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">完结申请</p>
                <p className="mt-1 font-medium">{order.workerCompletionRequested ? '已申请' : '未申请'}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {order.status === 'PENDING' && (
                <>
                  <Button size="sm" className="flex-1" onClick={() => toast.success('已接受任务')}>
                    接受
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => toast.success('已拒绝')}>
                    拒绝
                  </Button>
                </>
              )}
              {order.status === 'IN_PROGRESS' && !order.workerCompletionRequested && (
                <Button className="w-full" variant="outline" onClick={() => toast.success('完结申请已提交')}>
                  申请完结
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const canFollow = job!.dispatchMode === 'PUBLIC_APPLY' && job!.status === 'PUBLISHED'

  return (
    <div className="min-h-full bg-gradient-to-b from-profile-sky to-profile-gray pb-4">
      <div className="flex items-center gap-2 px-4 py-3">
        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-base font-semibold">任务详情</h1>
      </div>
      <div className="space-y-3 px-3">
        <div className="rounded-2xl border border-border bg-paper-white p-4 shadow-[var(--shadow-card)]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-sm bg-mist-gray px-1.5 py-0.5 text-[10px] text-muted-foreground">实拍</span>
            <StatusBadge status={job!.status} />
          </div>
          <h2 className="mt-3 text-lg font-semibold leading-snug">{job!.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{job!.description}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-mist-gray/35 p-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">提成基数</p>
              <p className="mt-1 font-semibold tabular-nums">{formatCurrency(job!.commissionBase)}</p>
            </div>
            {job!.finalRate != null && (
              <div>
                <p className="text-xs text-muted-foreground">提成比例</p>
                <p className="mt-1 font-semibold">{formatPercent(job!.finalRate)}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-muted-foreground">派发方式</p>
              <p className="mt-1 font-medium">{job!.dispatchMode === 'PUBLIC_APPLY' ? '公开申请' : '指派'}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {canFollow && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (followed) {
                    removeFollowedTask(job!.id)
                    setFollowed(false)
                    toast.success('已取消关注')
                  } else {
                    addFollowedTask(job!.id)
                    setFollowed(true)
                    toast.success('已加入关注')
                  }
                }}
              >
                {followed ? '取消关注' : '关注任务'}
              </Button>
            )}
            {job!.status === 'PENDING_ACCEPT' && (
              <>
                <Button size="sm" className="flex-1" onClick={() => toast.success('已接受任务')}>
                  接受
                </Button>
                <Button size="sm" variant="outline" className="flex-1" onClick={() => toast.success('已拒绝')}>
                  拒绝
                </Button>
              </>
            )}
            {job!.status === 'IN_PROGRESS' && (
              <Button className="w-full" variant="outline" onClick={() => toast.success('完结申请已提交')}>
                申请完结
              </Button>
            )}
            {job!.status === 'PUBLISHED' && (
              <Button className="w-full" onClick={() => toast.success('申请已提交')}>
                申请任务
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
