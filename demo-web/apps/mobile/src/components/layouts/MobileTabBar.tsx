import type { ComponentType } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Briefcase, Home, MessageCircle, User } from 'lucide-react'
import { getUnreadMessageCount } from '@/lib/messageUnread'
import { cn } from '@/lib/utils'

const TAB_INACTIVE = '#86909C'
const TAB_ACTIVE = '#2B9BFF'

type TabItem = {
  to: string
  label: string
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
  end?: boolean
  match?: (path: string) => boolean
}

function isTaskHallPath(path: string) {
  if (path === '/tasks/public' || path === '/tasks/assigned' || path === '/tasks/mine') return true
  if (path.startsWith('/tasks/')) {
    const segment = path.split('/')[2]
    return segment !== 'all' && segment !== undefined
  }
  return path.startsWith('/tasks/')
}

const tabs: TabItem[] = [
  { to: '/', label: '首页', icon: Home, end: true },
  {
    to: '/tasks/public',
    label: '任务',
    icon: Briefcase,
    match: (path) => isTaskHallPath(path) || path === '/tasks/all',
  },
  {
    to: '/messages',
    label: '消息',
    icon: MessageCircle,
    match: (path) => path === '/messages' || path.startsWith('/messages/'),
  },
  {
    to: '/profile',
    label: '我的',
    icon: User,
    match: (path) => path === '/profile' || path.startsWith('/settings') || path === '/wallet',
  },
]

function TabLink({ item }: { item: TabItem }) {
  const location = useLocation()
  const isActive = item.match
    ? item.match(location.pathname)
    : item.end
      ? location.pathname === item.to
      : location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)

  const unread = item.to === '/messages' ? getUnreadMessageCount() : 0

  return (
    <Link
      to={item.to}
      className="relative flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 py-1.5"
      style={{ color: isActive ? TAB_ACTIVE : TAB_INACTIVE }}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <item.icon className="h-[22px] w-[22px]" strokeWidth={isActive ? 2.4 : 1.75} />
        {unread > 0 && (
          <span
            className={cn(
              'absolute -right-2.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FF4D4F] px-1 text-[10px] font-medium leading-none text-white ring-2 ring-white',
              unread > 99 && 'min-w-[26px]',
            )}
          >
            {unread > 99 ? '99+' : unread}
          </span>
        )}
      </span>
      <span className={cn('text-[11px] leading-none', isActive && 'font-semibold')}>{item.label}</span>
    </Link>
  )
}

export function MobileTabBar() {
  return (
    <nav
      className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-[#EBEDF0] bg-white pb-[env(safe-area-inset-bottom)]"
      aria-label="主导航"
    >
      <div className="flex h-[54px] items-stretch px-1">
        {tabs.map((item) => (
          <TabLink key={item.to} item={item} />
        ))}
      </div>
    </nav>
  )
}
