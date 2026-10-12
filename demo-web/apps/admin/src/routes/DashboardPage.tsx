import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Users, Wallet, ClipboardList } from 'lucide-react'
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const kpiCards = [
  { label: '在职兼职', value: dashboardKPI.workerCount, icon: Users, suffix: '人' },
  { label: '进行中订单', value: dashboardKPI.activeOrders, icon: ClipboardList, suffix: '单' },
  { label: '待审提现', value: dashboardKPI.pendingWithdrawals, icon: Wallet, suffix: '笔' },
  { label: '本周提成', value: formatCurrency(dashboardKPI.weeklyCommission), icon: TrendingUp },
]

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="运营概览" description="查看平台核心指标与待办事项" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map(({ label, value, icon: Icon, suffix }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold tabular-nums">
                {value}
                {suffix && typeof value === 'number' ? suffix : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DataPanel title="待办事项">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link to="/withdrawals">
              待审提现 {adminTodos.pendingWithdrawals} 笔
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/offline-jobs">
              待核实任务 {adminTodos.pendingOfflineReview} 项
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/workers">
              离职审核 {adminTodos.pendingResign} 人
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </DataPanel>

      <div className="grid gap-6 lg:grid-cols-2">
        <DataPanel title="本周提成趋势">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyCommissionChart}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Bar dataKey="amount" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </DataPanel>

        <DataPanel title="最近流水">
          {recentLedger.length === 0 ? (
            <p className="text-sm text-muted-foreground">暂无流水记录</p>
          ) : (
            <ul className="space-y-3">
              {recentLedger.map((item) => (
                <li key={item.id} className="flex items-center justify-between text-sm">
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
