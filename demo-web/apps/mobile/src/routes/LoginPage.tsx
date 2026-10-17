import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { BrandMark } from '@/components/patterns/BrandMark'
import { WeChatIcon } from '@/components/icons/WeChatIcon'
import { isAuthenticated, setSession } from '@/lib/auth'
import { mockWeChatAuthorize } from '@/lib/wechatAuth'
import { cn } from '@/lib/utils'

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
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-paper-white">
      <div
        className="pointer-events-none absolute -right-10 -top-8 h-56 w-56 rounded-full bg-[#7AD4FF] opacity-80 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-8 top-16 h-40 w-40 rounded-full bg-[#FFE08A] opacity-90 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 top-40 h-48 w-48 rounded-full bg-brand-blue opacity-70 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-[#7AD4FF] opacity-50 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-1 flex-col items-center justify-center px-8 pb-16">
        <div className="flex items-center gap-3">
          <BrandMark size={56} />
          <span className="text-[34px] font-semibold tracking-tight text-[#1d4ed8]">拾影</span>
        </div>
        <p className="mt-5 text-[18px] tracking-[0.28em] text-[#334155]">让接单，更轻松</p>
      </div>

      <div className="relative px-8 pb-10">
        <button
          type="button"
          onClick={handleWeChatLogin}
          disabled={loading}
          className={cn(
            'flex h-12 w-full items-center justify-center gap-2 rounded-xl text-base font-medium text-white',
            'bg-[#07C160] transition-opacity duration-200 active:opacity-90 disabled:opacity-70',
          )}
        >
          <WeChatIcon className="h-5 w-5" />
          {loading ? '授权中…' : '微信授权登录'}
        </button>
        <p className="mt-6 text-center text-sm text-brand-blue">关于拾影</p>
        <p className="mt-2 text-center text-xs text-muted-foreground">客服电话：400-888-0926</p>
      </div>
    </div>
  )
}
