import { offlineJobs, onlineOrders } from './orders'

export type PipelineStatus = 'pendingAccept' | 'inProgress' | 'revision' | 'paymentPending'

export const PIPELINE_STATUS_LABELS: Record<PipelineStatus, string> = {
  pendingAccept: '待接单',
  inProgress: '进行中',
  revision: '交付修改',
  paymentPending: '申请到账',
}

export interface WorkerTaskItem {
  id: string
  title: string
  kind: 'online' | 'offline'
  pipelineStatus: PipelineStatus
  updatedAt: string
  commissionBase: number
  detailPath: string
}

const taskDates: Record<string, string> = {
  oj1: '2026-09-30',
  oj2: '2026-09-29',
  oj5: '2026-09-28',
  oj3: '2026-09-25',
  oj7: '2026-10-02',
  oj8: '2026-10-01',
  oo1: '2026-09-30',
  oo2: '2026-09-20',
  oo5: '2026-10-02',
}

function classifyOfflineJob(job: (typeof offlineJobs)[0], workerId: string): PipelineStatus | null {
  if (job.assigneeId === workerId && job.status === 'PENDING_ACCEPT') return 'pendingAccept'
  if (job.dispatchMode === 'PUBLIC_APPLY' && job.status === 'PUBLISHED') return 'pendingAccept'
  if (job.assigneeId === workerId && job.status === 'IN_PROGRESS') return 'inProgress'
  if (job.assigneeId === workerId && job.status === 'PENDING_REVIEW') return 'paymentPending'
  return null
}

function classifyOnlineOrder(order: (typeof onlineOrders)[0], workerId: string): PipelineStatus | null {
  if (order.assigneeId !== workerId) return null
  if (order.status === 'PENDING') return 'pendingAccept'
  if (order.status === 'IN_PROGRESS' && !order.workerCompletionRequested) return 'inProgress'
  if (order.status === 'IN_PROGRESS' && order.workerCompletionRequested && !order.transactionCompleted)
    return 'revision'
  if (order.workerCompletionRequested && order.transactionCompleted && !order.commissionCredited)
    return 'paymentPending'
  return null
}

export function getWorkerTaskItems(workerId: string): WorkerTaskItem[] {
  const items: WorkerTaskItem[] = []

  for (const job of offlineJobs) {
    const pipelineStatus = classifyOfflineJob(job, workerId)
    if (!pipelineStatus) continue
    items.push({
      id: job.id,
      title: job.title,
      kind: 'offline',
      pipelineStatus,
      updatedAt: taskDates[job.id] ?? '2026-09-01',
      commissionBase: job.commissionBase,
      detailPath: `/tasks/${job.id}`,
    })
  }

  for (const order of onlineOrders) {
    const pipelineStatus = classifyOnlineOrder(order, workerId)
    if (!pipelineStatus) continue
    items.push({
      id: order.id,
      title: order.title,
      kind: 'online',
      pipelineStatus,
      updatedAt: taskDates[order.id] ?? '2026-09-01',
      commissionBase: order.commissionBase,
      detailPath: `/tasks/${order.id}`,
    })
  }

  return items.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

export interface TaskPipelineCounts {
  pendingAccept: number
  inProgress: number
  revision: number
  paymentPending: number
}

/** 兼职端「我的」任务状态：待接单 / 进行中 / 交付修改 / 申请到账 */
/** 在途金额：进行中 / 交付修改 / 申请到账任务的预计提成合计 */
export function getWorkerInTransitAmount(workerId: string): number {
  return getWorkerTaskItems(workerId)
    .filter((item) =>
      item.pipelineStatus === 'inProgress' ||
      item.pipelineStatus === 'revision' ||
      item.pipelineStatus === 'paymentPending',
    )
    .reduce((sum, item) => sum + item.commissionBase, 0)
}

export function getWorkerTaskPipelineCounts(workerId: string): TaskPipelineCounts {
  const pendingAccept =
    offlineJobs.filter(
      (j) =>
        (j.assigneeId === workerId && j.status === 'PENDING_ACCEPT') ||
        (j.dispatchMode === 'PUBLIC_APPLY' && j.status === 'PUBLISHED'),
    ).length +
    onlineOrders.filter((o) => o.assigneeId === workerId && o.status === 'PENDING').length

  const inProgress =
    offlineJobs.filter((j) => j.assigneeId === workerId && j.status === 'IN_PROGRESS').length +
    onlineOrders.filter(
      (o) =>
        o.assigneeId === workerId &&
        o.status === 'IN_PROGRESS' &&
        !o.workerCompletionRequested,
    ).length

  const revision = onlineOrders.filter(
    (o) =>
      o.assigneeId === workerId &&
      o.status === 'IN_PROGRESS' &&
      o.workerCompletionRequested &&
      !o.transactionCompleted,
  ).length

  const paymentPending =
    offlineJobs.filter((j) => j.assigneeId === workerId && j.status === 'PENDING_REVIEW').length +
    onlineOrders.filter(
      (o) =>
        o.assigneeId === workerId &&
        o.workerCompletionRequested &&
        o.transactionCompleted &&
        !o.commissionCredited,
    ).length

  return { pendingAccept, inProgress, revision, paymentPending }
}

export const skillOptions = [
  '实拍视频拍摄',
  '视频剪辑包装',
  '企业宣传片',
  '动画制作',
  'AI 视频生成',
  'AI 漫剧',
  'AI 短剧',
  'AI 脚本分镜',
  '口播与配音',
  '字幕与调色',
] as const

export type SkillOption = (typeof skillOptions)[number]
