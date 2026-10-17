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
    <div className="min-h-full bg-page pb-6">
      <div className="bg-gradient-to-b from-profile-sky to-page px-4 pb-4 pt-5">
        <h1 className="text-lg font-semibold">我的钱包</h1>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <div>
            <p className="text-[11px] text-[#4e5969]">账户余额</p>
            <p className="mt-1 text-[20px] font-semibold tabular-nums">
              {visible ? formatCurrency(fin.balance).replace(/[¥￥]/g, '').trim() : '****'}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-[#4e5969]">可提现</p>
            <p className="mt-1 text-[20px] font-semibold tabular-nums">
              {visible ? formatCurrency(fin.withdrawable).replace(/[¥￥]/g, '').trim() : '****'}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-[#4e5969]">累计提现</p>
            <p className="mt-1 text-[20px] font-semibold tabular-nums">
              {visible ? formatCurrency(totalWithdrawn).replace(/[¥￥]/g, '').trim() : '****'}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 px-3">
        <FinancialCard
          balance={fin.balance}
          frozen={fin.frozen}
          withdrawable={fin.withdrawable}
          totalWithdrawn={totalWithdrawn}
          visible={visible}
          onToggle={toggle}
          walletLink={false}
        />
        <Button className="h-11 w-full rounded-xl text-base" onClick={() => setWithdrawOpen(true)}>
          申请提现
        </Button>

        <div className="rounded-2xl bg-paper-white p-4 shadow-[0_4px_16px_rgba(29,33,41,0.04)]">
          <h2 className="mb-3 text-[15px] font-semibold">资金流水</h2>
          {entries.length === 0 ? (
            <EmptyState title="暂无流水记录" />
          ) : (
            <ul>
              {entries.map((e) => (
                <li
                  key={e.id}
                  className="flex items-center justify-between border-b border-[#F2F3F5] py-3 text-sm last:border-b-0 last:pb-0"
                >
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
