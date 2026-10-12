export interface DemoAccount {
  username: string
  password: string
  displayName: string
  subtitle?: string
}

export const adminDemoAccounts: DemoAccount[] = [
  {
    username: 'admin',
    password: '123456',
    displayName: '系统管理员',
    subtitle: '运营与审核权限',
  },
  {
    username: 'ops',
    password: '123456',
    displayName: '运营专员',
    subtitle: '订单与兼职管理',
  },
]

export const workerDemoAccounts: DemoAccount[] = [
  {
    username: 'zhangsan',
    password: '123456',
    displayName: '张三',
    subtitle: '中级兼职 · 接单中',
  },
  {
    username: 'lisi',
    password: '123456',
    displayName: '李四',
    subtitle: '初级兼职 · 挂起中',
  },
  {
    username: 'wangwu',
    password: '123456',
    displayName: '王五',
    subtitle: '高级兼职 · 离职审核中',
  },
]

export function matchDemoAccount(
  accounts: DemoAccount[],
  username: string,
  password: string,
): DemoAccount | null {
  const normalized = username.trim().toLowerCase()
  return (
    accounts.find(
      (a) =>
        a.username.toLowerCase() === normalized && a.password === password,
    ) ?? null
  )
}
