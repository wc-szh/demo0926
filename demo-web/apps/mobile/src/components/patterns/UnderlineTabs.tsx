import { cn } from '@/lib/utils'

export function UnderlineTabs<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: { key: T; label: string }[]
  value: T
  onChange: (key: T) => void
}) {
  return (
    <div className="flex gap-6 border-b border-[#E5E6EB]">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={cn(
            'relative -mb-px pb-2.5 text-[15px] transition-colors duration-200',
            value === tab.key ? 'font-semibold text-ink-black' : 'text-muted-foreground',
          )}
        >
          {tab.label}
          {value === tab.key && (
            <span className="absolute inset-x-1 bottom-0 h-[3px] rounded-full bg-brand-blue" />
          )}
        </button>
      ))}
    </div>
  )
}
