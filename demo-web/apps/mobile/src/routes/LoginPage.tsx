import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { WeChatIcon } from '@/components/icons/WeChatIcon'
import { isAuthenticated, setSession } from '@/lib/auth'
import { mockWeChatAuthorize } from '@/lib/wechatAuth'
import { cn } from '@/lib/utils'

function BrandMark() {
  return (
    <div className="flex items-center justify-center gap-3">
      <img src="/favicon.svg" alt="" className="h-14 w-14" aria-hidden="true" />
      <span className="text-[32px] font-semibold tracking-tight text-mint-green">拾影</span>
    </div>
  )
}

export function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated()) navigate('/', { replace: true })
  }, [navigate])

  const handleWeChatLogin = async () => {
    if (loading) return
    setLoading(true)
    try {
      const auth = await mockWeChatAuthorize()
      setSession({
        username: auth.openId,
        displayName: auth.displayName,
        loginType: 'wechat',
        openId: auth.openId,
      })
      toast.success('登录成功')
      navigate('/')
    } catch {
      toast.error('微信授权失败', { description: '请稍后重试' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div
        className="pointer-events-none absolute -left-16 top-24 h-40 w-40 rounded-full bg-[#E8F5EE] opacity-80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-12 top-40 h-32 w-32 rounded-full bg-[#F3E8FF] opacity-70"
        aria-hidden="true"
      />

      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-16">
        <BrandMark />

        <div className="mt-16 w-full max-w-sm">
          <button
            type="button"
            onClick={handleWeChatLogin}
            disabled={loading}
            className={cn(
              'flex h-12 w-full items-center justify-center gap-2 rounded-lg text-base font-medium text-white transition-opacity duration-200',
              'bg-[#07C160] active:opacity-90 disabled:opacity-70',
            )}
          >
            <WeChatIcon className="h-5 w-5" />
            {loading ? '授权中…' : '微信授权登录'}
          </button>
        </div>
      </div>

      <footer className="px-6 pb-10 text-center">
        <p className="text-sm text-mint-green">关于拾影</p>
        <p className="mt-2 text-xs text-muted-foreground">客服电话：400-888-0926</p>
      </footer>
    </div>
  )
}
