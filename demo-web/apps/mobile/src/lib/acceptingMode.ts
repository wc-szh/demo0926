import { useCallback, useState } from 'react'
import type { WorkerMode } from '@lingong/shared'

const STORAGE_KEY = 'lingong-mobile-accepting-mode'

export function readAcceptingMode(fallback: WorkerMode = 'ACCEPTING'): WorkerMode {
  const raw = sessionStorage.getItem(STORAGE_KEY)
  if (raw === 'ACCEPTING' || raw === 'SUSPENDED') return raw
  return fallback
}

export function writeAcceptingMode(mode: WorkerMode) {
  sessionStorage.setItem(STORAGE_KEY, mode)
}

export function useAcceptingMode(fallback: WorkerMode = 'ACCEPTING') {
  const [mode, setMode] = useState(() => readAcceptingMode(fallback))

  const toggle = useCallback(() => {
    setMode((prev) => {
      const next: WorkerMode = prev === 'ACCEPTING' ? 'SUSPENDED' : 'ACCEPTING'
      writeAcceptingMode(next)
      return next
    })
  }, [])

  return { mode, toggle, accepting: mode === 'ACCEPTING' }
}
