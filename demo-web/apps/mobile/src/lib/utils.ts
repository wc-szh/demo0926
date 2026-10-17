import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cardSurface =
  'rounded-2xl bg-paper-white shadow-[0_4px_16px_rgba(29,33,41,0.04)]'
