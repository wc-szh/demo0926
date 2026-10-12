import type { Level, DepositTier, SystemSettings } from '../types'

export const levels: Level[] = [
  { id: 'lv1', name: '初级', bonusPercent: 0, sortOrder: 1 },
  { id: 'lv2', name: '中级', bonusPercent: 5, sortOrder: 2 },
  { id: 'lv3', name: '高级', bonusPercent: 10, sortOrder: 3 },
]

export const depositTiers: DepositTier[] = [
  { id: 'dt1', orderAmountMin: 0, orderAmountMax: 500, requiredDepositFrozen: 50 },
  { id: 'dt2', orderAmountMin: 500, orderAmountMax: 2000, requiredDepositFrozen: 200 },
  { id: 'dt3', orderAmountMin: 2000, orderAmountMax: null, requiredDepositFrozen: 500 },
]

export const systemSettings: SystemSettings = {
  baseRatePercent: 15,
  minWithdrawAmount: 100,
  frozenDescription: '押金用于保障订单履约，完结后可释放。',
}
