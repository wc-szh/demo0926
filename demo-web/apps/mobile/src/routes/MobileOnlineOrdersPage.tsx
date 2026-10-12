import { toast } from 'sonner'
import { formatCurrency, onlineOrders } from '@lingong/shared'
import { EmptyState } from '@/components/patterns/EmptyState'
import { MobilePageShell } from '@/components/patterns/MobilePageShell'
import { StatusBadge } from '@/components/patterns/StatusBadge'
import { Button } from '@/components/ui/button'

const CURRENT_WORKER = 'w1'

export function MobileOnlineOrdersPage() {
  const orders = onlineOrders.filter((o) => o.assigneeId === CURRENT_WORKER)
  const inProgress = orders.filter((o) => o.status === 'IN_PROGRESS').length

  return (
    <MobilePageShell title="电商订单" subtitle={inProgress > 0 ? `${inProgress} 单进行中` : '线上履约与提成结算'}>
      {orders.length === 0 ? (
        <div className="rounded-2xl border border-border bg-paper-white p-6 shadow-[var(--shadow-card)]">
          <EmptyState title="暂无电商订单" description="运营指派后将在此展示订单进度" />
        </div>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li
              key={order.id}
              className="rounded-2xl border border-border bg-paper-white p-4 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-medium">{order.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{order.externalOrderNo}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>
              <div className="mt-3 space-y-2 rounded-xl bg-mist-gray/35 p-3 text-sm">
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground">兼职申请</span>
                  <span>{order.workerCompletionRequested ? '已申请完结' : '未申请'}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground">交易状态</span>
                  <span>{order.transactionCompleted ? '交易已完成' : '交易未完成'}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground">提成基数</span>
                  <span className="font-semibold tabular-nums">{formatCurrency(order.commissionBase)}</span>
                </div>
              </div>
              {order.status === 'IN_PROGRESS' && !order.workerCompletionRequested && (
                <Button className="mt-3 w-full" size="sm" onClick={() => toast.success('完结申请已提交')}>
                  申请完结
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </MobilePageShell>
  )
}
