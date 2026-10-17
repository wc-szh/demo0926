import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { Search } from 'lucide-react'
import { homeBanners } from '@lingong/shared'
import { cn } from '@/lib/utils'

const TONE_CLASS: Record<'blue' | 'mint', string> = {
  blue: 'from-[#7AD4FF] via-[#4EA8FF] to-[#C9E8FF]',
  mint: 'from-[#9BE7C8] via-[#5EC8F5] to-[#D6F3FF]',
}

export function HomeHeroBanner({
  query,
  onQueryChange,
  onSearch,
  children,
}: {
  query: string
  onQueryChange: (value: string) => void
  onSearch: () => void
  children?: ReactNode
}) {
  const [index, setIndex] = useState(0)
  const startX = useRef<number | null>(null)
  const slides = homeBanners
  const current = slides[index] ?? slides[0]

  useEffect(() => {
    if (slides.length < 2) return
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 6000)
    return () => window.clearInterval(timer)
  }, [slides.length])

  if (!current) return null

  const go = (next: number) => {
    const total = slides.length
    setIndex(((next % total) + total) % total)
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    startX.current = event.clientX
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (startX.current == null) return
    const delta = event.clientX - startX.current
    startX.current = null
    if (delta > 48) go(index - 1)
    else if (delta < -48) go(index + 1)
  }

  return (
    <div
      className={cn('relative px-4 pb-2 pt-4', TONE_CLASS[current.tone ?? 'blue'], 'bg-gradient-to-b')}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        startX.current = null
      }}
    >
      <label
        className="relative flex h-9 items-center gap-2 rounded-full bg-white/85 px-3.5 text-sm shadow-[0_4px_16px_rgba(43,155,255,0.12)] backdrop-blur-sm"
        onPointerDown={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
      >
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearch()
          }}
          placeholder="搜索你想做的任务"
          className="min-w-0 flex-1 bg-transparent text-[13px] text-ink-black outline-none placeholder:text-muted-foreground"
        />
      </label>

      <div className="relative mt-5 min-h-[108px] pb-2">
        <span className="absolute right-0 top-0 rounded-md bg-gradient-to-r from-[#FF8A3D] to-[#FF5C7A] px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
          {current.tag}
        </span>
        {current.kicker && (
          <p className="pr-16 text-[10px] font-medium uppercase tracking-[0.16em] text-white/75">{current.kicker}</p>
        )}
        <h2 className="mt-1.5 max-w-[92%] text-[26px] font-black leading-[1.15] tracking-tight text-white drop-shadow-[0_2px_8px_rgba(43,155,255,0.35)]">
          {current.title}
        </h2>
        <p className="mt-2 max-w-[90%] text-[13px] font-medium leading-relaxed text-white/90">{current.subtitle}</p>
      </div>

      {slides.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5 pb-1">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`切换到第 ${i + 1} 张海报`}
              onClick={() => setIndex(i)}
              className={cn(
                'h-1.5 rounded-full transition-all',
                i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/45',
              )}
            />
          ))}
        </div>
      )}

      {children ? <div className="relative mt-3 px-0 pb-4">{children}</div> : null}
    </div>
  )
}
