import { useCallback, useState } from 'react'

const STORAGE_KEY = 'lingong-mobile-amount-visible'

export function readAmountVisible(): boolean {
  return sessionStorage.getItem(STORAGE_KEY) !== 'false'
}

export function writeAmountVisible(visible: boolean) {
  sessionStorage.setItem(STORAGE_KEY, String(visible))
}

export function useAmountVisible() {
  const [visible, setVisible] = useState(readAmountVisible)

  const toggle = useCallback(() => {
    setVisible((prev) => {
      const next = !prev
      writeAmountVisible(next)
      return next
    })
  }, [])

  return { visible, toggle }
}
