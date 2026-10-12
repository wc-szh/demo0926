import { STATUS_LABELS } from '@lingong/shared'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const variantMap: Record<string, 'default' | 'brand' | 'secondary' | 'destructive' | 'success' | 'warning' | 'outline'> = {
  PENDING: 'warning',
  IN_PROGRESS: 'brand',
  COMPLETED: 'success',
  CLOSED: 'secondary',
  PUBLISHED: 'brand',
  PENDING_ACCEPT: 'warning',
  PENDING_REVIEW: 'warning',
  REJECTED: 'destructive',
  APPROVED: 'success',
  ACTIVE: 'success',
  PENDING_RESIGN: 'warning',
  RESIGNED: 'secondary',
  ACCEPTING: 'success',
  SUSPENDED: 'secondary',
  ASSIGN: 'outline',
  PUBLIC_APPLY: 'outline',
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const label = STATUS_LABELS[status] ?? status
  const variant = variantMap[status] ?? 'outline'
  return (
    <Badge variant={variant} className={cn('font-normal', className)}>
      {label}
    </Badge>
  )
}
