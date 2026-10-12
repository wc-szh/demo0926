import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { AuthShell } from '@/components/patterns/AuthShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    company: '',
    name: '',
    phone: '',
    password: '',
    confirm: '',
  })

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.company || !form.name || !form.phone || !form.password) {
      toast.error('请填写完整注册信息')
      return
    }
    if (form.password !== form.confirm) {
      toast.error('两次输入的密码不一致')
      return
    }
    if (!/^1\d{10}$/.test(form.phone)) {
      toast.error('请输入正确的手机号')
      return
    }
    toast.success('注册成功', { description: '请使用新账号登录管理端' })
    navigate('/login')
  }

  return (
    <AuthShell
      title="注册管理端账号"
      description="创建企业管理员账号（演示数据，不会真实保存）"
      alternate={{ label: '已有账号？', to: '/login' }}
    >
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="company">企业名称</Label>
          <Input id="company" placeholder="例如：某某人力资源公司" value={form.company} onChange={update('company')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">管理员姓名</Label>
          <Input id="name" placeholder="请输入姓名" value={form.name} onChange={update('name')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">手机号</Label>
          <Input id="phone" placeholder="11 位手机号" value={form.phone} onChange={update('phone')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">密码</Label>
          <Input id="password" type="password" placeholder="至少 6 位" value={form.password} onChange={update('password')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">确认密码</Label>
          <Input id="confirm" type="password" placeholder="再次输入密码" value={form.confirm} onChange={update('confirm')} />
        </div>
        <Button type="submit" className="w-full" size="lg">
          注册
        </Button>
      </form>
    </AuthShell>
  )
}
