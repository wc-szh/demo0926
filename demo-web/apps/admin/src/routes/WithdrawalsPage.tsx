import { toast } from 'sonner'
import { formatCurrency, withdrawals, workers } from '@lingong/shared'
import { PageHeader } from '@/components/patterns/PageHeader'
import { DataPanel } from '@/components/patterns/DataPanel'
import { EmptyState } from '@/components/patterns/EmptyState'
import { StatusBadge } from '@/components/patterns/StatusBadge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function WithdrawalsPage() {
  const pending = withdrawals.filter((w) => w.status === 'PENDING')
  const history = withdrawals.filter((w) => w.status !== 'PENDING')
  const getWorkerName = (id: string) => workers.find((w) => w.id === id)?.displayName ?? id

  const handleReview = (approved: boolean) => {
    toast.success(approved ? '提现已通过' : '提现已驳回')
  }

  return (
    <div className="space-y-6">
      <PageHeader title="提现审核" description="审核兼职提现申请，核对金额与手续费" />

      <DataPanel title={`待审核（${pending.length}）`}>
        {pending.length === 0 ? (
          <EmptyState title="暂无待审提现" description="所有提现申请已处理完毕" />
        ) : (
          <div className="space-y-4">
            {pending.map((wd) => (
              <div key={wd.id} className="rounded-lg border p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{getWorkerName(wd.workerId)}</p>
                    <p className="text-xs text-muted-foreground">{wd.createdAt.slice(0, 16).replace('T', ' ')}</p>
                  </div>
                  <StatusBadge status={wd.status} />
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground">申请金额</p>
                    <p className="text-lg font-semibold tabular-nums">{formatCurrency(wd.amount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">手续费</p>
                    <p className="text-lg font-semibold tabular-nums text-muted-foreground">
                      {formatCurrency(wd.fee)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">实际到账</p>
                    <p className="text-lg font-semibold tabular-nums text-mint-green">
                      {formatCurrency(wd.actualAmount)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button onClick={() => handleReview(true)}>通过</Button>
                  <Button variant="destructive" onClick={() => handleReview(false)}>
                    驳回
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </DataPanel>

      <DataPanel title="历史记录">
        <ul className="space-y-3">
          {history.map((wd) => (
            <li key={wd.id} className="flex items-center justify-between text-sm">
              <div>
                <p className="font-medium">{getWorkerName(wd.workerId)}</p>
                <p className="text-muted-foreground">{wd.createdAt.slice(0, 10)}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="tabular-nums">{formatCurrency(wd.amount)}</span>
                <StatusBadge status={wd.status} />
              </div>
            </li>
          ))}
        </ul>
      </DataPanel>
    </div>
  )
}
