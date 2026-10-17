import { cn } from '@/lib/utils'

export type TaskHallCategoryKey = 'live' | 'store' | 'event' | 'edit' | 'ai'

export const TASK_HALL_CATEGORIES: { key: TaskHallCategoryKey; label: string }[] = [
  { key: 'live', label: '实拍' },
  { key: 'store', label: '探店测评' },
  { key: 'event', label: '活动纪实' },
  { key: 'edit', label: '素材精剪' },
  { key: 'ai', label: '动画成片' },
]

export function TaskHallCategoryTabs({
  value,
  onChange,
}: {
  value: TaskHallCategoryKey
  onChange: (key: TaskHallCategoryKey) => void
}) {
  return (
    <div className="-mx-3 mt-3 flex gap-2 overflow-x-auto px-3 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {TASK_HALL_CATEGORIES.map((tab) => {
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

export function jobMatchesTaskHallCategory(job: { title: string; description: string }, key: TaskHallCategoryKey) {
  const text = `${job.title}${job.description}`
  switch (key) {
    case 'live':
      return /拍摄|实拍|外景|宣传片|采访|空镜|园区/.test(text)
    case 'store':
      return /探店|开箱|门店/.test(text)
    case 'event':
      return /活动|展会|纪实|快剪回顾/.test(text)
    case 'edit':
      return /精剪|Vlog|素材|剪辑|字幕/.test(text)
    case 'ai':
      return /动画|AI|二维|AE/.test(text)
    default:
      return true
  }
}
