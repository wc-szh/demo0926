import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { adminDemoAccounts, matchDemoAccount } from '@lingong/shared'
import { AuthShell } from '@/components/patterns/AuthShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { isAuthenticated, setSession } from '@/lib/auth'

export function LoginPage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) navigate('/dashboard', { replace: true })
  }, [navigate])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const account = matchDemoAccount(adminDemoAccounts, username, password)
    if (!account) {
      toast.error('账号或密码错误', {
        description: '演示账号：admin / 123456',
      })
      return
    }
    setSession({ username: account.username, displayName: account.displayName })
    toast.success(`欢迎回来，${account.displayName}`)
    navigate('/dashboard')
  }

  const fillDemo = (account: typeof adminDemoAccounts[0]) => {
    setUsername(account.username)
    setPassword(account.password)
  }

  return (
    <AuthShell
      title="登录管理端"
      description="使用管理员账号登录"
      alternate={{ label: '还没有账号？', to: '/register' }}
      footer={
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-4">
          <p className="mb-3 text-xs font-medium text-muted-foreground">演示账号（点击填入）</p>
          <div className="space-y-2">
            {adminDemoAccounts.map((account) => (
              <button
                key={account.username}
                type="button"
                onClick={() => fillDemo(account)}
                className="flex w-full items-center justify-between rounded-sm border border-border bg-background px-3 py-2 text-left text-sm transition-colors duration-200 hover:border-brand-blue/40"
              >
                <span className="font-medium">{account.displayName}</span>
                <span className="text-xs text-muted-foreground">
                  {account.username} / {account.password}
                </span>
              </button>
            ))}
          </div>
        </div>
      }
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">账号</Label>
          <Input
            id="username"
            placeholder="请输入管理员账号"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">密码</Label>
          <Input
            id="password"
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <Button type="submit" className="w-full" size="lg">
          登录
        </Button>
      </form>
    </AuthShell>
  )
}
