import type { MessageCategory } from '@lingong/shared'
import { cn } from '@/lib/utils'

export type MessageCategoryFilter = 'ALL' | MessageCategory

const TABS: { key: MessageCategoryFilter; label: string }[] = [
  { key: 'ALL', label: '全部' },
  { key: 'SYSTEM', label: '系统' },
  { key: 'TASK', label: '接单' },
  { key: 'VIOLATION', label: '违规' },
  { key: 'BALANCE', label: '余额' },
]

export function MessageCategoryTabs({
  value,
  onChange,
}: {
  value: MessageCategoryFilter
  onChange: (key: MessageCategoryFilter) => void
}) {
  return (
    <div className="-mx-3 mt-3 flex gap-2 overflow-x-auto px-3 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {TABS.map((tab) => {
        const active = value === tab.key
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={cn(
              'inline-flex shrink-0 items-center rounded-md px-3.5 py-1.5 text-[13px] leading-none transition-colors',
              active
                ? 'bg-brand-blue font-medium text-white shadow-[0_4px_12px_rgba(43,155,255,0.25)]'
                : 'text-muted-foreground active:text-[#4e5969]',
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
