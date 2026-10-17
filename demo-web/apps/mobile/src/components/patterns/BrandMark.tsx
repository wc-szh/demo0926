import { cn } from '@/lib/utils'

export function BrandMark({
  className,
  size = 48,
}: {
  className?: string
  size?: number
}) {
  return (
    <svg
      className={cn('shrink-0', className)}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <path
        d="M14 12c8-7 22-4 26 10 2 7-1 16-8 20"
        fill="none"
        stroke="#2B9BFF"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M10 18c2-8 12-12 20-8"
        fill="none"
        stroke="#7AD4FF"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M34 10c6 2 10 8 9 16"
        fill="none"
        stroke="#FFD56A"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}
