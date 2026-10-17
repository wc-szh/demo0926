import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Bell, CheckCheck, Search, TriangleAlert, UserCheck, Wallet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { MessageCategory, Notification } from '@lingong/shared'
import { MESSAGE_CATEGORY_LABELS } from '@lingong/shared'
import { EmptyState } from '@/components/patterns/EmptyState'
import {
  MessageCategoryTabs,
  type MessageCategoryFilter,
} from '@/components/patterns/MessageCategoryTabs'
import {
  getWorkerNotifications,
  markAllNotificationsRead,
} from '@/lib/messageUnread'
import { getTaskOfferResponse } from '@/lib/messageTaskOffer'
import { cn } from '@/lib/utils'

const CURRENT_WORKER = 'w1'

type ReadFilter = 'all' | 'unread'

const CATEGORY_THUMB: Record<MessageCategory, { gradient: string; icon: LucideIcon }> = {
  SYSTEM: { gradient: 'from-brand-blue to-brand-blue-deep', icon: Bell },
  TASK: { gradient: 'from-[#A78BFA] to-brand-blue-deep', icon: UserCheck },
  VIOLATION: { gradient: 'from-[#FB7185] to-[#F59E0B]', icon: TriangleAlert },
  BALANCE: { gradient: 'from-[#F59E0B] to-[#FB7185]', icon: Wallet },
}

export function MessagesPage() {
  const [items, setItems] = useState(() => getWorkerNotifications(CURRENT_WORKER))
  const [query, setQuery] = useState('')
  const [readFilter, setReadFilter] = useState<ReadFilter>('all')
  const [categoryFilter, setCategoryFilter] = useState<MessageCategoryFilter>('ALL')

  const filtered = useMemo(() => {
    const q = query.trim()
    return items.filter((n) => {
      if (readFilter === 'unread' && n.read) return false
      if (categoryFilter !== 'ALL' && n.category !== categoryFilter) return false
      if (q && !n.title.includes(q) && !n.body.includes(q)) return false
      return true
    })
  }, [items, readFilter, categoryFilter, query])

  const unreadCount = items.filter((n) => !n.read).length

  const markAllRead = () => {
    markAllNotificationsRead(CURRENT_WORKER)
    setItems(getWorkerNotifications(CURRENT_WORKER))
    toast.success('全部已读')
  }

  return (
    <div className="relative min-h-full overflow-hidden bg-page pb-6">
      <div
        className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-[#7AD4FF]/50 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-6 top-8 h-28 w-28 rounded-full bg-[#FFD56A]/40 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-12 top-24 h-36 w-36 rounded-full bg-brand-blue/25 blur-2xl"
        aria-hidden
      />

      <div className="relative flex items-center gap-2 px-3 pb-3 pt-4">
        <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-md bg-paper-white px-3.5 text-sm shadow-[0_4px_16px_rgba(29,33,41,0.04)]">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索消息"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </label>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className="flex h-10 shrink-0 items-center gap-1 rounded-md bg-gradient-to-r from-brand-blue to-brand-blue-deep px-3 text-xs font-medium text-white active:opacity-90"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            全部已读
          </button>
        )}
      </div>

      <div className="relative px-3">
        <div className="flex items-end justify-between gap-3">
          <h3 className="flex items-center text-[17px] font-bold leading-tight text-brand-blue-deep">
            <span className="relative inline-block">
              全部
              <svg
                className="pointer-events-none absolute -bottom-0.5 left-0 h-[7px] w-[2.1em] text-brand-blue"
                viewBox="0 0 48 8"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 6C14 2 26 2 46 5"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.35"
                />
              </svg>
            </span>
            消息
          </h3>
          <div className="flex shrink-0 items-center gap-3 pb-0.5">
            {(['all', 'unread'] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setReadFilter(key)}
                className={cn(
                  'text-[13px] leading-tight transition-colors active:opacity-80',
                  readFilter === key
                    ? 'font-semibold text-brand-blue-deep'
                    : 'text-muted-foreground',
                )}
              >
                {key === 'all' ? '全部' : '未读'}
              </button>
            ))}
          </div>
        </div>

        <MessageCategoryTabs value={categoryFilter} onChange={setCategoryFilter} />

        {filtered.length === 0 ? (
          <div className="mt-3 rounded-lg bg-paper-white p-6 shadow-[0_4px_16px_rgba(29,33,41,0.04)]">
            <EmptyState
              title={
                query
                  ? '没有匹配的消息'
                  : readFilter === 'unread'
                    ? '没有未读消息'
                    : categoryFilter === 'ALL'
                      ? '暂无消息'
                      : `暂无${MESSAGE_CATEGORY_LABELS[categoryFilter]}`
              }
            />
          </div>
        ) : (
          <ul className="mt-3 space-y-2.5">
            {filtered.map((n) => (
              <li key={n.id}>
                <MessageFeedCard item={n} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function MessageFeedCard({ item }: { item: Notification }) {
  const thumb = CATEGORY_THUMB[item.category]
  const ThumbIcon = thumb.icon
  const pendingOffer = item.taskOffer && !getTaskOfferResponse(item.id) && item.category === 'TASK'

  return (
    <Link
      to={`/messages/${item.id}`}
      className="flex gap-3 rounded-lg bg-paper-white p-3 shadow-[0_4px_16px_rgba(29,33,41,0.04)] active:opacity-90"
    >
      <span
        className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br',
          thumb.gradient,
        )}
      >
        <ThumbIcon className="h-6 w-6 text-white/80" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              'truncate text-[15px] leading-snug',
              item.read ? 'font-medium text-ink-black' : 'font-semibold text-ink-black',
            )}
          >
            {item.title}
          </p>
          {!item.read && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FB7185]" />}
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <span className="rounded-[4px] bg-mist-gray px-1.5 py-0.5 text-[10px] leading-none text-muted-foreground">
            {MESSAGE_CATEGORY_LABELS[item.category]}
          </span>
          {pendingOffer && (
            <span className="rounded-[4px] bg-announce px-1.5 py-0.5 text-[10px] font-medium leading-none text-mint-green">
              待确认
            </span>
          )}
          <span className="text-[10px] leading-none text-muted-foreground">
            {item.createdAt.slice(0, 16).replace('T', ' ')}
          </span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">{item.body}</p>
      </div>
    </Link>
  )
}
