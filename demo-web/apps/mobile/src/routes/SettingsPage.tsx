import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { skillOptions, workers } from '@lingong/shared'
import type { SkillOption } from '@lingong/shared'
import { AvatarPicker } from '@/components/patterns/AvatarPicker'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  createWorkerProfileDefaults,
  loadWorkerProfile,
  readAvatarFile,
  saveWorkerProfile,
  WORKER_IDENTITY_LABELS,
  type AvatarMode,
  type WorkerIdentityType,
} from '@/lib/workerProfile'
import { clearSession } from '@/lib/auth'
import { resolveAvatarSrc } from '@/lib/workerAvatar'
import { cn } from '@/lib/utils'

const CURRENT_WORKER = 'w1'

export function SettingsPage() {
  const navigate = useNavigate()
  const worker = workers.find((w) => w.id === CURRENT_WORKER)!
  const defaults = createWorkerProfileDefaults(worker)
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [skills, setSkills] = useState<SkillOption[]>([])
  const [avatarMode, setAvatarMode] = useState<AvatarMode>(defaults.avatarMode)
  const [avatarCustom, setAvatarCustom] = useState<string | undefined>()
  const [identityType, setIdentityType] = useState<WorkerIdentityType>(defaults.identityType)
  const [portfolioOpen, setPortfolioOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)

  const identityOptions = Object.entries(WORKER_IDENTITY_LABELS) as [WorkerIdentityType, string][]

  useEffect(() => {
    const saved = loadWorkerProfile(defaults)
    setDisplayName(saved.displayName)
    setBio(saved.bio)
    setSkills(saved.skills)
    setAvatarMode(saved.avatarMode)
    setAvatarCustom(saved.avatarCustom)
    setIdentityType(saved.identityType)
  }, [])

  useEffect(() => {
    if (window.location.hash === '#portfolio') {
      document.getElementById('portfolio-section')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const previewSrc = useMemo(
    () => resolveAvatarSrc({ avatarMode, avatarCustom }, worker.gender),
    [avatarMode, avatarCustom, worker.gender],
  )

  const toggleSkill = (skill: SkillOption) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    )
  }

  const handleAvatarUpload = async (file: File) => {
    try {
      const dataUrl = await readAvatarFile(file)
      setAvatarMode('custom')
      setAvatarCustom(dataUrl)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '图片上传失败')
    }
  }

  const handleSave = () => {
    if (!displayName.trim()) {
      toast.error('请输入昵称')
      return
    }
    saveWorkerProfile({
      displayName: displayName.trim(),
      bio,
      skills,
      avatarMode,
      avatarCustom: avatarMode === 'custom' ? avatarCustom : undefined,
      identityType,
    })
    toast.success('设置已保存')
  }

  const handleLogout = () => {
    clearSession()
    setLogoutOpen(false)
    toast.success('已退出登录')
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-full bg-page pb-4">
      <div className="sticky top-0 z-10 flex items-center gap-2 px-4 py-3">
        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-base font-semibold">设置</h1>
      </div>

      <div className="space-y-3 p-3">
        <div className="rounded-2xl bg-paper-white p-4 shadow-[0_4px_16px_rgba(29,33,41,0.04)]">
          <h2 className="mb-3 text-sm font-medium">头像</h2>
          <AvatarPicker
            previewSrc={previewSrc}
            avatarMode={avatarMode}
            onSelectMode={(mode) => setAvatarMode(mode)}
            onUpload={handleAvatarUpload}
          />
        </div>

        <div className="rounded-2xl bg-paper-white p-4 shadow-[0_4px_16px_rgba(29,33,41,0.04)]">
          <h2 className="mb-3 text-sm font-medium">基本信息</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="nickname" className="w-14 shrink-0 text-sm text-muted-foreground">
                昵称
              </Label>
              <Input
                id="nickname"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="请输入昵称"
                maxLength={20}
                className="h-9 min-w-0 flex-1 bg-paper-white"
              />
            </div>
            <div className="border-t border-border pt-4">
              <p className="mb-3 text-sm text-muted-foreground">主体类型</p>
              <div className="grid grid-cols-3 gap-2">
                {identityOptions.map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setIdentityType(value)}
                    className={cn(
                      'rounded-2xl border px-3 py-2.5 text-sm transition-colors duration-200',
                      identityType === value
                        ? 'border-brand-blue/40 bg-accent font-medium text-brand-blue-deep'
                        : 'border-border bg-mist-gray/30 text-muted-foreground',
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2 border-t border-border pt-4">
              <Label htmlFor="bio">个人简介</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                placeholder="介绍一下你的技能与经验"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-paper-white p-4 shadow-[0_4px_16px_rgba(29,33,41,0.04)]">
          <h2 className="mb-3 text-sm font-medium">擅长技能</h2>
          <p className="mb-3 text-xs text-muted-foreground">勾选你擅长的方向，便于匹配任务</p>
          <div className="grid grid-cols-2 gap-3">
            {skillOptions.map((skill) => {
              const checked = skills.includes(skill)
              return (
                <label
                  key={skill}
                  className={cn(
                    'flex cursor-pointer items-center gap-2 rounded-sm border px-3 py-2.5 text-sm transition-colors duration-200',
                    checked ? 'border-brand-blue/40 bg-accent' : 'border-border',
                  )}
                >
                  <Checkbox checked={checked} onCheckedChange={() => toggleSkill(skill)} />
                  <span>{skill}</span>
                </label>
              )
            })}
          </div>
        </div>

        <Button className="w-full" onClick={handleSave}>
          保存设置
        </Button>

        <div
          id="portfolio-section"
          className="rounded-2xl bg-paper-white p-4 shadow-[0_4px_16px_rgba(29,33,41,0.04)]"
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium">作品集</h2>
            <Button size="sm" variant="outline" onClick={() => setPortfolioOpen(true)}>
              添加
            </Button>
          </div>
          {worker.portfolio.length === 0 ? (
            <p className="text-sm text-muted-foreground">暂无作品，点击添加展示你的项目经验</p>
          ) : (
            <ul className="space-y-2">
              {worker.portfolio.map((p) => (
                <li key={p.id} className="rounded-lg border border-border bg-mist-gray/30 p-3 text-sm">
                  <p className="font-medium">{p.title}</p>
                  <p className="mt-1 text-muted-foreground">{p.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl bg-paper-white p-4 shadow-[0_4px_16px_rgba(29,33,41,0.04)]">
          <h2 className="mb-3 text-sm font-medium">账号信息</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">用户ID</span>
              <span className="font-medium">{worker.id}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3">
              <span className="text-muted-foreground">手机号</span>
              <span className="tabular-nums">{worker.phone}</span>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full text-destructive hover:bg-destructive/5 hover:text-destructive"
          onClick={() => setLogoutOpen(true)}
        >
          退出登录
        </Button>
      </div>

      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>退出登录</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">确定要退出当前账号吗？</p>
          <DialogFooter className="flex-row gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setLogoutOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" className="flex-1" onClick={handleLogout}>
              退出
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={portfolioOpen} onOpenChange={setPortfolioOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加作品</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>标题</Label>
              <Input placeholder="项目名称" />
            </div>
            <div className="space-y-2">
              <Label>描述</Label>
              <Textarea placeholder="简要说明" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPortfolioOpen(false)}>
              取消
            </Button>
            <Button
              onClick={() => {
                toast.success('作品已添加')
                setPortfolioOpen(false)
              }}
            >
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
