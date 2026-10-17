import { Link } from 'react-router-dom'
import { ArrowRight, ClipboardList, TrendingUp, Users, Wallet } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  adminTodos,
  dashboardKPI,
  formatCurrency,
  recentLedger,
  weeklyCommissionChart,
} from '@lingong/shared'
import { PageHeader } from '@/components/patterns/PageHeader'
import { DataPanel } from '@/components/patterns/DataPanel'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const kpiCards = [
  {
    label: '在职兼职',
    value: dashboardKPI.workerCount,
    suffix: '人',
    hint: '当前可接单人员',
    icon: Users,
    tone: 'bg-[#E8F8EE] text-mint-green',
  },
  {
    label: '进行中订单',
    value: dashboardKPI.activeOrders,
    suffix: '单',
    hint: '实拍 + AI 视频',
    icon: ClipboardList,
    tone: 'bg-[#E8F4FF] text-brand-blue-deep',
  },
  {
    label: '待审提现',
    value: dashboardKPI.pendingWithdrawals,
    suffix: '笔',
    hint: '需尽快处理',
    icon: Wallet,
    tone: 'bg-[#FFF7E6] text-[#D48806]',
  },
  {
    label: '本周提成',
    value: formatCurrency(dashboardKPI.weeklyCommission),
    hint: '已入账佣金',
    icon: TrendingUp,
    tone: 'bg-[#F3E8FF] text-[#7C3AED]',
  },
]

const todos = [
  {
    to: '/withdrawals',
    title: `待审提现 ${adminTodos.pendingWithdrawals} 笔`,
    description: '兼职申请提现，待财务审核',
  },
  {
    to: '/offline-jobs',
    title: `待核实任务 ${adminTodos.pendingOfflineReview} 项`,
    description: '线下任务完结申请待确认',
  },
  {
    to: '/workers',
    title: `离职审核 ${adminTodos.pendingResign} 人`,
    description: '处理离职申请与冷却期',
  },
]

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="运营概览" description="工作台指标、待办与本周提成" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map(({ label, value, icon: Icon, suffix, hint, tone }) => (
          <Card key={label} className="border-0 shadow-[0_4px_16px_rgba(29,33,41,0.04)]">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <p className="text-sm text-muted-foreground">{label}</p>
                <span className={cn('flex h-9 w-9 items-center justify-center rounded-xl', tone)}>
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <div className="mt-3 text-[28px] font-semibold leading-none tabular-nums tracking-tight">
                {value}
                {suffix && typeof value === 'number' ? (
                  <span className="ml-1 text-sm font-medium text-muted-foreground">{suffix}</span>
                ) : null}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <DataPanel title="待办事项">
        <ul>
          {todos.map((item) => (
            <li
              key={item.to}
              className="flex items-center gap-4 border-b border-[#F2F3F5] py-3 last:border-b-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to={item.to}>
                  去处理
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </DataPanel>

      <div className="grid gap-6 lg:grid-cols-2">
        <DataPanel title="本周提成趋势">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyCommissionChart}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Bar dataKey="amount" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </DataPanel>

        <DataPanel title="最近流水">
          {recentLedger.length === 0 ? (
            <p className="text-sm text-muted-foreground">暂无流水记录</p>
          ) : (
            <ul>
              {recentLedger.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between border-b border-[#F2F3F5] py-3 text-sm last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{item.worker}</p>
                    <p className="text-muted-foreground">{item.type}</p>
                  </div>
                  <div className="text-right">
                    <p className={item.amount >= 0 ? 'tabular-nums' : 'tabular-nums text-destructive'}>
                      {formatCurrency(item.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </DataPanel>
      </div>
    </div>
  )
}
