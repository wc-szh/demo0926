import type { Worker, Withdrawal, LedgerEntry, Notification } from '../types'
import { levels } from './settings'

export const workers: Worker[] = [
  {
    id: 'w1',
    username: 'zhangsan',
    displayName: '张三',
    gender: 'male',
    phone: '13800138001',
    levelId: 'lv2',
    status: 'ACTIVE',
    mode: 'ACCEPTING',
    balance: 3280.5,
    joinedAt: '2024-03-15',
    completedTaskCount: 28,
    totalCommission: 12680,
    creditScore: 86,
    bio: '擅长实拍剪辑与 AI 视频成片，3 年短视频经验。',
    portfolio: [
      { id: 'p1', title: '美妆品牌竖屏广告', description: '实拍 + AI 包装成片 12 条' },
      { id: 'p2', title: 'AI 数字人口播系列', description: '脚本到成片全流程交付' },
    ],
  },
  {
    id: 'w2',
    username: 'lisi',
    displayName: '李四',
    gender: 'female',
    phone: '13800138002',
    levelId: 'lv1',
    status: 'ACTIVE',
    mode: 'SUSPENDED',
    balance: 890,
    joinedAt: '2025-06-01',
    completedTaskCount: 5,
    totalCommission: 1580,
    creditScore: 72,
    bio: '新人兼职，学习能力强。',
    portfolio: [],
  },
  {
    id: 'w3',
    username: 'wangwu',
    displayName: '王五',
    gender: 'male',
    phone: '13800138003',
    levelId: 'lv3',
    status: 'PENDING_RESIGN',
    mode: 'SUSPENDED',
    balance: 1560,
    joinedAt: '2023-01-10',
    completedTaskCount: 42,
    totalCommission: 28900,
    creditScore: 94,
    bio: '高级创作者，专注活动纪实与快剪。',
    portfolio: [{ id: 'p3', title: '多城活动快剪', description: '单场活动 24h 内交片' }],
  },
]

export const withdrawals: Withdrawal[] = [
  {
    id: 'wd1',
    workerId: 'w1',
    amount: 500,
    fee: 5,
    actualAmount: 495,
    status: 'PENDING',
    createdAt: '2026-09-30T10:00:00',
  },
  {
    id: 'wd2',
    workerId: 'w2',
    amount: 200,
    fee: 2,
    actualAmount: 198,
    status: 'APPROVED',
    createdAt: '2026-09-28T14:30:00',
  },
  {
    id: 'wd3',
    workerId: 'w1',
    amount: 8900,
    fee: 89,
    actualAmount: 8811,
    status: 'APPROVED',
    createdAt: '2026-09-15T10:00:00',
  },
]

export const ledgerEntries: LedgerEntry[] = [
  {
    id: 'le1',
    workerId: 'w1',
    type: 'COMMISSION_ONLINE',
    amount: 128.5,
    description: 'AI 视频单 AI-20260928-3301 提成入账',
    createdAt: '2026-09-28T16:00:00',
  },
  {
    id: 'le2',
    workerId: 'w1',
    type: 'COMMISSION_OFFLINE',
    amount: 350,
    description: '实拍任务「门店探店实拍剪辑」提成入账',
    createdAt: '2026-09-27T11:00:00',
  },
  {
    id: 'le3',
    workerId: 'w1',
    type: 'WITHDRAWAL',
    amount: -500,
    description: '提现申请 #wd1',
    createdAt: '2026-09-30T10:00:00',
  },
]

export const notifications: Notification[] = [
  {
    id: 'n1',
    workerId: 'w1',
    title: '新指派任务',
    body: '您有一条新的实拍任务「门店探店实拍剪辑」，请及时确认。',
    detail:
      '运营已将实拍任务「门店探店实拍剪辑」指派给您。\n\n工作内容：到店拍摄探店素材，完成 60s 竖屏成片。\n时间：周末可排期。\n请在 24 小时内确认是否接单，超时将自动释放给其他人选。',
    read: false,
    type: 'INFO',
    category: 'TASK',
    taskOffer: { jobId: 'oj1' },
    createdAt: '2026-09-30T09:00:00',
  },
  {
    id: 'n2',
    workerId: 'w1',
    title: '提现审核中',
    body: '您的提现申请 ¥500 正在审核，预计 1-2 个工作日到账。',
    detail:
      '提现单号：wd1\n申请金额：¥500.00\n当前状态：审核中\n\n审核通过后资金将转入您绑定的银行卡，到账时间以银行处理为准。如有疑问请联系客服。',
    read: false,
    type: 'WARNING',
    category: 'BALANCE',
    createdAt: '2026-09-30T10:05:00',
  },
  {
    id: 'n3',
    workerId: 'w1',
    title: '提成入账',
    body: 'AI 视频单提成 ¥128.50 已入账。',
    detail: 'AI 视频单 AI-20260928-3301 提成 ¥128.50 已计入可提现余额，您可在「我的资产」中查看明细。',
    read: true,
    type: 'SUCCESS',
    category: 'BALANCE',
    createdAt: '2026-09-28T16:00:00',
  },
  {
    id: 'n4',
    workerId: 'w1',
    title: '任务审核提醒',
    body: '「Vlog 素材精剪」已提交完结申请，请等待运营审核。',
    detail:
      '您于 2026-10-01 提交的「Vlog 素材精剪」完结申请已进入审核队列。审核结果将通过消息通知您，请留意接单消息。',
    read: false,
    type: 'INFO',
    category: 'TASK',
    createdAt: '2026-10-01T09:20:00',
  },
  {
    id: 'n5',
    workerId: 'w1',
    title: '系统通知',
    body: '您关注的「活动纪实短视频」仍有名额，建议尽快申请。',
    detail:
      '您关注的任务「活动纪实短视频」当前仍可申请。名额有限，建议前往任务大厅查看详情并提交申请。',
    read: true,
    type: 'INFO',
    category: 'SYSTEM',
    createdAt: '2026-09-29T18:00:00',
  },
  {
    id: 'n6',
    workerId: 'w1',
    title: '履约违规提醒',
    body: '检测到您有任务签到迟到记录，请规范履约。',
    detail:
      '系统记录您在任务「产品开箱实拍」中存在迟到到场（2026-09-28）。\n\n请按排期到场并完成素材交付。累计违规可能影响信用分与后续接单资格。如对记录有异议，可在 7 日内发起申诉。',
    read: false,
    type: 'WARNING',
    category: 'VIOLATION',
    createdAt: '2026-09-30T14:30:00',
  },
]

export function getWorkerLevel(workerId: string) {
  const worker = workers.find((w) => w.id === workerId)
  return levels.find((l) => l.id === worker?.levelId)
}

export function getWorkerTenureDays(joinedAt: string, asOf = '2026-10-01') {
  const start = new Date(joinedAt)
  const end = new Date(asOf)
  return Math.max(0, Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))
}

export function getWorkerTotalWithdrawn(workerId: string) {
  return withdrawals
    .filter((w) => w.workerId === workerId && w.status === 'APPROVED')
    .reduce((sum, w) => sum + w.amount, 0)
}

export function getWorkerFinancials(workerId: string) {
  const worker = workers.find((w) => w.id === workerId)
  if (!worker) return { balance: 0, requiredDeposit: 0, frozen: 200, withdrawable: 0 }
  const frozen = 200
  const requiredDeposit = 200
  const withdrawable = Math.max(0, worker.balance - frozen)
  return {
    balance: worker.balance,
    requiredDeposit,
    frozen,
    withdrawable,
  }
}
