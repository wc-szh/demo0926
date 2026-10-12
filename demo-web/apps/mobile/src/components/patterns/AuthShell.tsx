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
    <div className="flex min-h-screen flex-col bg-background">
      <div className="bg-mint-green px-6 py-12 text-center text-paper-white">
        <div className="mx-auto max-w-md">
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-sm bg-paper-white" />
            <span className="text-sm font-medium">拾影</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">接单赚钱，结算清晰</h1>
          <p className="mt-1 text-sm text-paper-white/80">任务 · 钱包 · 提现一站管理</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 pb-8">
        <div className="mx-auto w-full max-w-md -mt-8 space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="mb-5">
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </div>
            {children}
          </div>
          {alternate && (
            <p className="text-center text-sm text-muted-foreground">
              {alternate.label}{' '}
              <Link to={alternate.to} className="font-medium text-mint-green hover:underline">
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
