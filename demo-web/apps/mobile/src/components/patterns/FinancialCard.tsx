import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { formatCurrency } from '@lingong/shared'
import { AssetEyeIcon } from '@/components/icons/AssetEyeIcon'
import { cn } from '@/lib/utils'

interface FinancialCardProps {
  balance: number
  frozen: number
  withdrawable: number
  totalWithdrawn?: number
  visible: boolean
  onToggle: () => void
  className?: string
  showTitle?: boolean
  walletLink?: boolean
}

function maskAmount(visible: boolean, amount: number) {
  return visible ? formatCurrency(amount) : '******'
}

const gridItems: { label: string; key: 'frozen' | 'withdrawable' }[] = [
  { label: '可提', key: 'withdrawable' },
  { label: '冻结', key: 'frozen' },
]

export function FinancialCard({
  balance,
  frozen,
  withdrawable,
  visible,
  onToggle,
  className,
  showTitle = true,
  walletLink = true,
}: FinancialCardProps) {
  const amounts = {
    frozen,
    withdrawable,
  }

  const totalRow = (
    <>
      <span className="text-2xl font-semibold tabular-nums tracking-tight">
        {maskAmount(visible, balance)}
      </span>
      {walletLink && <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2} />}
    </>
  )

  return (
    <div className={cn('rounded-2xl border border-border p-4 shadow-[var(--shadow-card)]', className)}>
      <div className="mb-3 flex items-center">
        {showTitle && <p className="text-sm font-medium">我的资产(元)</p>}
        <button
          type="button"
          className={cn(
            'inline-flex items-center justify-center text-muted-foreground transition-opacity duration-200 active:opacity-60',
            showTitle ? 'ml-0.5' : '',
          )}
          onClick={onToggle}
          aria-label={visible ? '隐藏金额' : '显示金额'}
        >
          <AssetEyeIcon visible={visible} />
        </button>
      </div>

      {walletLink ? (
        <Link
          to="/wallet"
          className="mb-4 flex items-center justify-between gap-2 transition-opacity duration-200 active:opacity-70"
        >
          {totalRow}
        </Link>
      ) : (
        <div className="mb-4 flex items-center justify-between gap-2">{totalRow}</div>
      )}

      <div className="grid grid-cols-2 gap-x-4">
        {gridItems.map(({ label, key }) => (
          <div key={key} className="flex min-w-0 items-center justify-between gap-2">
            <span className="shrink-0 text-xs text-muted-foreground">{label}</span>
            <span className="truncate text-right text-sm font-medium tabular-nums">
              {maskAmount(visible, amounts[key])}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
