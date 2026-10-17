import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface AuthShellProps {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
  alternate?: { label: string; to: string }
}

export function AuthShell({ title, description, children, footer, alternate }: AuthShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-page">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#7AD4FF] via-brand-blue to-[#1677FF] px-6 py-14 text-center text-paper-white">
        <div className="mx-auto max-w-md">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-sm bg-paper-white" />
            <span className="text-sm font-medium tracking-wide">拾影 · 管理端</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">灵活用工协作平台</h1>
          <p className="mt-2 text-sm text-paper-white/80">结算审核 · 订单管理 · 兼职运营</p>
        </div>
      </div>
      <div className="flex flex-1 items-start justify-center p-6">
        <div className="w-full max-w-md -mt-10 space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </div>
            {children}
          </div>
          {alternate && (
            <p className="text-center text-sm text-muted-foreground">
              {alternate.label}{' '}
              <Link to={alternate.to} className="font-medium text-brand-blue hover:underline">
                {alternate.to.includes('register') ? '立即注册' : '去登录'}
              </Link>
            </p>
          )}
          {footer}
        </div>
      </div>
    </div>
  )
}
