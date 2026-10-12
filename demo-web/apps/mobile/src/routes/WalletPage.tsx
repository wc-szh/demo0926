import { useState } from 'react'
import { toast } from 'sonner'
import { formatCurrency, getWorkerFinancials, getWorkerTotalWithdrawn, ledgerEntries } from '@lingong/shared'
import { EmptyState } from '@/components/patterns/EmptyState'
import { FinancialCard } from '@/components/patterns/FinancialCard'
import { MaskedAmount } from '@/components/patterns/MaskedAmount'
import { useAmountVisible } from '@/lib/amountVisible'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const CURRENT_WORKER = 'w1'

export function WalletPage() {
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const { visible, toggle } = useAmountVisible()
  const fin = getWorkerFinancials(CURRENT_WORKER)
  const totalWithdrawn = getWorkerTotalWithdrawn(CURRENT_WORKER)
  const entries = ledgerEntries.filter((e) => e.workerId === CURRENT_WORKER)

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-lg font-semibold">我的钱包</h1>

      <div className="space-y-4">
        <FinancialCard
          balance={fin.balance}
          frozen={fin.frozen}
          withdrawable={fin.withdrawable}
          totalWithdrawn={totalWithdrawn}
          visible={visible}
          onToggle={toggle}
          walletLink={false}
        />
        <Button className="w-full" onClick={() => setWithdrawOpen(true)}>
          申请提现
        </Button>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-medium text-muted-foreground">资金流水</h2>
        {entries.length === 0 ? (
          <EmptyState title="暂无流水记录" />
        ) : (
          <ul className="space-y-3">
            {entries.map((e) => (
              <li key={e.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                <div>
                  <p className="font-medium">{e.description}</p>
                  <p className="text-xs text-muted-foreground">{e.createdAt.slice(0, 16).replace('T', ' ')}</p>
                </div>
                <MaskedAmount amount={e.amount} visible={visible} showSign />
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>申请提现</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              可提现金额 {visible ? formatCurrency(fin.withdrawable) : '****'}，手续费 1%
            </p>
            <div className="space-y-2">
              <Label>提现金额</Label>
              <Input type="number" placeholder="100" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWithdrawOpen(false)}>
              取消
            </Button>
            <Button
              onClick={() => {
                toast.success('提现申请已提交')
                setWithdrawOpen(false)
              }}
            >
              提交
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
