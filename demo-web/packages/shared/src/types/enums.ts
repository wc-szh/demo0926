export type TaskType = 'ONLINE_ORDER' | 'OFFLINE_JOB'
export type DispatchMode = 'ASSIGN' | 'PUBLIC_APPLY'
export type WorkerStatus = 'ACTIVE' | 'PENDING_RESIGN' | 'RESIGNED'
export type WorkerMode = 'ACCEPTING' | 'SUSPENDED'
export type OnlineOrderStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CLOSED'
export type OfflineJobStatus =
  | 'PUBLISHED'
  | 'PENDING_ACCEPT'
  | 'IN_PROGRESS'
  | 'PENDING_REVIEW'
  | 'COMPLETED'
  | 'CLOSED'
  | 'REJECTED'
export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED'
export type WithdrawalStatus = 'PENDING' | 'APPROVED' | 'REJECTED'
export type LedgerType =
  | 'COMMISSION_ONLINE'
  | 'COMMISSION_OFFLINE'
  | 'WITHDRAWAL'
  | 'WITHDRAWAL_FEE'
export type NotificationType = 'INFO' | 'SUCCESS' | 'WARNING'
export type MessageCategory = 'SYSTEM' | 'TASK' | 'VIOLATION' | 'BALANCE'

export const MESSAGE_CATEGORY_LABELS: Record<MessageCategory, string> = {
  SYSTEM: '系统消息',
  TASK: '接单消息',
  VIOLATION: '违规信息',
  BALANCE: '余额变动',
}

export const STATUS_LABELS: Record<string, string> = {
  PENDING: '待处理',
  IN_PROGRESS: '进行中',
  COMPLETED: '已完成',
  CLOSED: '已关闭',
  PUBLISHED: '已发布',
  PENDING_ACCEPT: '待接受',
  PENDING_REVIEW: '待核实',
  REJECTED: '已驳回',
  APPROVED: '已通过',
  ACTIVE: '在职',
  PENDING_RESIGN: '离职审核中',
  RESIGNED: '已离职',
  ACCEPTING: '接单中',
  SUSPENDED: '挂起中',
  ASSIGN: '指派',
  PUBLIC_APPLY: '公开申请',
}
