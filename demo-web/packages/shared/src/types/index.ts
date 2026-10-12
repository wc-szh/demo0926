import type {
  ApplicationStatus,
  DispatchMode,
  MessageCategory,
  NotificationType,
  OfflineJobStatus,
  OnlineOrderStatus,
  WorkerMode,
  WorkerStatus,
  WithdrawalStatus,
} from './enums'

export interface Level {
  id: string
  name: string
  bonusPercent: number
  sortOrder: number
}

export interface DepositTier {
  id: string
  orderAmountMin: number
  orderAmountMax: number | null
  requiredDepositFrozen: number
}

export interface PortfolioItem {
  id: string
  title: string
  description: string
  url?: string
}

export type WorkerGender = 'male' | 'female'

export interface Worker {
  id: string
  username: string
  displayName: string
  gender: WorkerGender
  phone: string
  levelId: string
  status: WorkerStatus
  mode: WorkerMode
  balance: number
  joinedAt: string
  completedTaskCount: number
  totalCommission: number
  creditScore: number
  bio?: string
  portfolio: PortfolioItem[]
}

export interface OnlineOrder {
  id: string
  externalOrderNo: string
  title: string
  assigneeId: string
  commissionBase: number
  finalRate: number
  status: OnlineOrderStatus
  workerCompletionRequested: boolean
  transactionCompleted: boolean
  commissionCredited: boolean
}

export interface JobApplication {
  id: string
  workerId: string
  status: ApplicationStatus
  createdAt: string
}

export interface OfflineJob {
  id: string
  title: string
  description: string
  dispatchMode: DispatchMode
  assigneeId?: string
  commissionBase: number
  finalRate?: number
  status: OfflineJobStatus
  applications: JobApplication[]
  commissionCredited: boolean
}

export interface Withdrawal {
  id: string
  workerId: string
  amount: number
  fee: number
  actualAmount: number
  status: WithdrawalStatus
  createdAt: string
}

export interface LedgerEntry {
  id: string
  workerId: string
  type: string
  amount: number
  description: string
  createdAt: string
}

export interface NotificationTaskOffer {
  jobId: string
}

export interface Notification {
  id: string
  workerId: string
  title: string
  body: string
  /** 详情页展示的完整说明，缺省时使用 body */
  detail?: string
  read: boolean
  type: NotificationType
  category: MessageCategory
  /** 待确认的指派任务，详情页展示接受/拒绝 */
  taskOffer?: NotificationTaskOffer
  createdAt: string
}

export interface SystemSettings {
  baseRatePercent: number
  minWithdrawAmount: number
  frozenDescription: string
}

export interface DashboardKPI {
  workerCount: number
  activeOrders: number
  pendingWithdrawals: number
  weeklyCommission: number
}

export interface AdminTodos {
  pendingWithdrawals: number
  pendingOfflineReview: number
  pendingResign: number
}

export interface WorkerFinancials {
  balance: number
  requiredDeposit: number
  frozen: number
  withdrawable: number
}
