import { useRef } from 'react'
import { Camera } from 'lucide-react'
import type { AvatarMode } from '@/lib/workerProfile'
import { defaultAvatarAssets } from '@/lib/workerAvatar'
import { WorkerAvatar } from '@/components/patterns/WorkerAvatar'
import { cn } from '@/lib/utils'

interface AvatarPickerProps {
  previewSrc: string
  avatarMode: AvatarMode
  onSelectMode: (mode: AvatarMode) => void
  onUpload: (file: File) => void
}

const options: { mode: AvatarMode; label: string; src: string }[] = [
  { mode: 'male', label: '男性默认', src: defaultAvatarAssets.male },
  { mode: 'female', label: '女性默认', src: defaultAvatarAssets.female },
]

export function AvatarPicker({ previewSrc, avatarMode, onSelectMode, onUpload }: AvatarPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <WorkerAvatar src={previewSrc} className="h-20 w-20" alt="头像预览" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {options.map(({ mode, label, src }) => {
          const selected = avatarMode === mode
          return (
            <button
              key={mode}
              type="button"
              onClick={() => onSelectMode(mode)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-2xl border p-3 transition-colors duration-200',
                selected ? 'border-mint-green bg-accent' : 'border-border bg-mist-gray/30',
              )}
            >
              <img src={src} alt={label} className="h-14 w-14 rounded-full object-cover" />
              <span className="text-xs text-muted-foreground">{label}</span>
            </button>
          )
        })}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            'flex flex-col items-center justify-center gap-2 rounded-2xl border p-3 transition-colors duration-200',
            avatarMode === 'custom' ? 'border-mint-green bg-accent' : 'border-border bg-mist-gray/30',
          )}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-paper-white">
            <Camera className="h-6 w-6 text-muted-foreground" />
          </div>
          <span className="text-xs text-muted-foreground">上传图片</span>
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onUpload(file)
          e.target.value = ''
        }}
      />

      <p className="text-center text-xs text-muted-foreground">支持 JPG、PNG，大小不超过 1MB</p>
    </div>
  )
}
