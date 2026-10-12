import { User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface WorkerAvatarProps {
  src: string
  className?: string
  alt?: string
}

export function WorkerAvatar({ src, className, alt = '用户头像' }: WorkerAvatarProps) {
  return (
    <Avatar className={cn('bg-paper-white/90 shadow-sm', className)}>
      <AvatarImage src={src} alt={alt} className="object-cover" />
      <AvatarFallback className="bg-mist-gray text-muted-foreground">
        <User className="h-7 w-7" strokeWidth={1.5} />
      </AvatarFallback>
    </Avatar>
  )
}
