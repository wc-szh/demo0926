import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { RequireAuth } from '@/components/RequireAuth'
import { AdminLayout } from '@/layouts/AdminLayout'
import { LoginPage } from '@/routes/LoginPage'
import { RegisterPage } from '@/routes/RegisterPage'
import { DashboardPage } from '@/routes/DashboardPage'
import { WorkersPage } from '@/routes/WorkersPage'
import { OnlineOrdersPage } from '@/routes/OnlineOrdersPage'
import { OfflineJobsPage } from '@/routes/OfflineJobsPage'
import { OrdersPage } from '@/routes/OrdersPage'
import { WithdrawalsPage } from '@/routes/WithdrawalsPage'
import { SettingsPage } from '@/routes/SettingsPage'
import { StyleGuidePage } from '@/routes/StyleGuidePage'
import { isAuthenticated } from '@/lib/auth'

function HomeRedirect() {
  return <Navigate to={isAuthenticated() ? '/dashboard' : '/login'} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<RequireAuth />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/workers" element={<WorkersPage />} />
            <Route path="/online-orders" element={<OnlineOrdersPage />} />
            <Route path="/offline-jobs" element={<OfflineJobsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/withdrawals" element={<WithdrawalsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/style-guide" element={<StyleGuidePage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  )
}
