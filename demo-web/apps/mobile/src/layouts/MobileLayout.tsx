import { Outlet } from 'react-router-dom'
import { MobileTabBar } from '@/components/layouts/MobileTabBar'

export function MobileLayout() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-page">
      <main className="flex-1 overflow-auto pb-[calc(54px+env(safe-area-inset-bottom))]">
        <Outlet />
      </main>
      <MobileTabBar />
    </div>
  )
}
