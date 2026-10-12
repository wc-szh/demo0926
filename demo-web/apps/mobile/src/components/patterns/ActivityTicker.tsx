import { activityFeed, formatCurrency } from '@lingong/shared'

export function ActivityTicker() {
  const items = [...activityFeed, ...activityFeed]

  return (
    <div className="overflow-hidden border-b border-border bg-accent/60 py-2">
      <div className="flex animate-[marquee_40s_linear_infinite] gap-10 whitespace-nowrap px-4">
        {items.map((item, i) => (
          <span key={`${item.id}-${i}`} className="inline-flex items-center gap-1 text-xs text-foreground">
            <span className="font-medium text-mint-green">{item.workerName}</span>
            <span>{item.action}</span>
            <span className="font-semibold tabular-nums text-mint-green">{formatCurrency(item.amount)}</span>
            <span className="text-muted-foreground">· {item.time}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
