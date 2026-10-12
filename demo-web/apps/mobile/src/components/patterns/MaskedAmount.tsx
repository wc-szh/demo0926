import { formatCurrency } from '@lingong/shared'
import { cn } from '@/lib/utils'

interface MaskedAmountProps {
  amount: number
  visible: boolean
  className?: string
  showSign?: boolean
}

export function MaskedAmount({ amount, visible, className, showSign }: MaskedAmountProps) {
  if (!visible) {
    return <span className={cn('tabular-nums font-medium', className)}>****</span>
  }

  const text = `${showSign && amount >= 0 ? '+' : ''}${formatCurrency(amount)}`

  return (
    <span
      className={cn('tabular-nums font-medium', amount < 0 && 'text-destructive', className)}
    >
      {text}
    </span>
  )
}
