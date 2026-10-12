import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Briefcase,
  ListOrdered,
  Wallet,
  Settings,
  Palette,
  LogOut,
} from 'lucide-react'
import { adminTodos } from '@lingong/shared'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { clearSession, getSession } from '@/lib/auth'

const navItems = [
  { to: '/dashboard', label: '运营概览', icon: LayoutDashboard },
  { to: '/workers', label: '兼职管理', icon: Users, badge: adminTodos.pendingResign },
  { to: '/online-orders', label: 'AI 视频单', icon: ShoppingCart },
  { to: '/offline-jobs', label: '线下任务', icon: Briefcase, badge: adminTodos.pendingOfflineReview },
  { to: '/orders', label: '订单总览', icon: ListOrdered },
  { to: '/withdrawals', label: '提现审核', icon: Wallet, badge: adminTodos.pendingWithdrawals },
  { to: '/settings', label: '系统设置', icon: Settings },
  { to: '/style-guide', label: '组件验收', icon: Palette },
]

export function AdminLayout() {
  const navigate = useNavigate()
  const session = getSession()

  const handleLogout = () => {
    clearSession()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-60 shrink-0 border-r bg-sidebar lg:block">
        <div className="flex h-14 items-center gap-2 border-b px-6">
          <span className="h-2 w-2 rounded-sm bg-mint-green" />
          <span className="text-base font-semibold text-sidebar-foreground">拾影 · 管理端</span>
        </div>
        <nav className="space-y-1 p-4">
          {navItems.map(({ to, label, icon: Icon, badge }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors duration-200',
                  isActive
                    ? 'bg-sidebar-accent font-medium text-mint-green'
                    : 'text-sidebar-foreground hover:bg-muted',
                )
              }
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1">{label}</span>
              {badge ? (
                <Badge variant="destructive" className="h-5 min-w-5 justify-center px-1.5 text-xs">
                  {badge}
                </Badge>
              ) : null}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b px-6">
          <p className="text-sm text-muted-foreground">
            {session?.displayName ? `${session.displayName}，欢迎回来` : '灵活用工协作平台'}
          </p>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            退出
          </Button>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
