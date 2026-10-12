import type { DashboardKPI, AdminTodos } from '../types'

export const dashboardKPI: DashboardKPI = {
  workerCount: 48,
  activeOrders: 23,
  pendingWithdrawals: 3,
  weeklyCommission: 12850,
}

export const adminTodos: AdminTodos = {
  pendingWithdrawals: 3,
  pendingOfflineReview: 2,
  pendingResign: 1,
}

export const weeklyCommissionChart = [
  { day: '周一', amount: 1520 },
  { day: '周二', amount: 2100 },
  { day: '周三', amount: 1850 },
  { day: '周四', amount: 2340 },
  { day: '周五', amount: 1980 },
  { day: '周六', amount: 1620 },
  { day: '周日', amount: 1440 },
]

export const recentLedger = [
  { id: 'rl1', worker: '张三', type: 'AI 视频提成', amount: 128.5, time: '2026-09-28 16:00' },
  { id: 'rl2', worker: '李四', type: '提现', amount: -200, time: '2026-09-28 14:30' },
  { id: 'rl3', worker: '张三', type: '实拍提成', amount: 350, time: '2026-09-27 11:00' },
  { id: 'rl4', worker: '王五', type: 'AI 视频提成', amount: 96, time: '2026-09-26 09:15' },
]
