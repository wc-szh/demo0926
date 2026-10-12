import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { ChevronRight } from 'lucide-react'
import type { MessageCategory } from '@lingong/shared'
import { MESSAGE_CATEGORY_LABELS } from '@lingong/shared'
import { EmptyState } from '@/components/patterns/EmptyState'
import { MobilePageShell } from '@/components/patterns/MobilePageShell'
import { Button } from '@/components/ui/button'
import {
  getWorkerNotifications,
  markAllNotificationsRead,
} from '@/lib/messageUnread'
import { getTaskOfferResponse } from '@/lib/messageTaskOffer'
import { cn } from '@/lib/utils'

const CURRENT_WORKER = 'w1'

type ReadFilter = 'all' | 'unread'
type CategoryFilter = 'ALL' | MessageCategory

const categoryTabs: { key: CategoryFilter; label: string }[] = [
  { key: 'ALL', label: '全部' },
  { key: 'SYSTEM', label: '系统' },
  { key: 'TASK', label: '接单' },
  { key: 'VIOLATION', label: '违规' },
  { key: 'BALANCE', label: '余额' },
]

export function MessagesPage() {
  const [items, setItems] = useState(() => getWorkerNotifications(CURRENT_WORKER))
  const [readFilter, setReadFilter] = useState<ReadFilter>('all')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('ALL')

  const filtered = useMemo(() => {
    return items.filter((n) => {
      if (readFilter === 'unread' && n.read) return false
      if (categoryFilter !== 'ALL' && n.category !== categoryFilter) return false
      return true
    })
  }, [items, readFilter, categoryFilter])

  const unreadCount = items.filter((n) => !n.read).length

  const markAllRead = () => {
    markAllNotificationsRead(CURRENT_WORKER)
    setItems(getWorkerNotifications(CURRENT_WORKER))
    toast.success('全部已读')
  }

  return (
    <MobilePageShell
      title="消息"
      subtitle={unreadCount > 0 ? `${unreadCount} 条未读` : '暂无未读消息'}
      headerExtra={
        unreadCount > 0 ? (
          <Button variant="ghost" size="sm" className="h-8 shrink-0 text-xs text-[#FF4D4F]" onClick={markAllRead}>
            全部已读
          </Button>
        ) : null
      }
    >
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categoryTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setCategoryFilter(tab.key)}
            className={cn(
              'shrink-0 rounded-2xl border px-3 py-1.5 text-xs transition-colors duration-200',
              categoryFilter === tab.key
                ? 'border-[#FF4D4F]/40 bg-[#FFF1F0] font-medium text-[#FF4D4F]'
                : 'border-border bg-paper-white text-muted-foreground',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        {(['all', 'unread'] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setReadFilter(key)}
            className={cn(
              'rounded-2xl border px-3 py-1.5 text-xs transition-colors duration-200',
              readFilter === key
                ? 'border-[#FF4D4F]/40 bg-[#FFF1F0] font-medium text-[#FF4D4F]'
                : 'border-border bg-paper-white text-muted-foreground',
            )}
          >
            {key === 'all' ? '全部状态' : '未读'}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-paper-white p-6 shadow-[var(--shadow-card)]">
          <EmptyState
            title={
              readFilter === 'unread'
                ? '没有未读消息'
                : categoryFilter === 'ALL'
                  ? '暂无消息'
                  : `暂无${MESSAGE_CATEGORY_LABELS[categoryFilter as MessageCategory]}`
            }
          />
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((n) => {
            const pendingOffer =
              n.taskOffer && !getTaskOfferResponse(n.id) && n.category === 'TASK'
            return (
              <li key={n.id}>
                <Link
                  to={`/messages/${n.id}`}
                  className={cn(
                    'flex items-center gap-2 rounded-2xl border border-border bg-paper-white p-4 shadow-[var(--shadow-card)] transition-colors duration-200 active:bg-mist-gray/30',
                    !n.read && 'border-[#FF4D4F]/25',
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-sm bg-mist-gray px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        {MESSAGE_CATEGORY_LABELS[n.category]}
                      </span>
                      {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D4F]" />}
                      {pendingOffer && (
                        <span className="rounded-sm bg-[#FFF1F0] px-1.5 py-0.5 text-[10px] text-[#FF4D4F]">
                          待确认
                        </span>
                      )}
                    </div>
                    <p className={cn('mt-1.5 text-sm font-medium', !n.read && 'text-foreground')}>
                      {n.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {n.body}
                    </p>
                    <p className="mt-2 text-[10px] text-muted-foreground">
                      {n.createdAt.slice(0, 16).replace('T', ' ')}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </MobilePageShell>
  )
}
