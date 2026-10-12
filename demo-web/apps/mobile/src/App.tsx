import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { RequireAuth } from '@/components/RequireAuth'
import { MobileLayout } from '@/layouts/MobileLayout'
import { LoginPage } from '@/routes/LoginPage'
import { RegisterPage } from '@/routes/RegisterPage'
import { HomePage } from '@/routes/HomePage'
import { FollowPage } from '@/routes/FollowPage'
import {
  TasksPublicPage,
  TasksAssignedPage,
  TasksMinePage,
  TaskDetailPage,
} from '@/routes/TasksPages'
import { TasksAllPage } from '@/routes/TasksAllPage'
import { WalletPage } from '@/routes/WalletPage'
import { ProfilePage } from '@/routes/ProfilePage'
import { MessageDetailPage } from '@/routes/MessageDetailPage'
import { MessagesPage } from '@/routes/MessagesPage'
import { MobileStyleGuidePage } from '@/routes/MobileStyleGuidePage'
import { SettingsPage } from '@/routes/SettingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<RequireAuth />}>
          <Route element={<MobileLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/follow" element={<FollowPage />} />
            <Route path="/tasks/public" element={<TasksPublicPage />} />
            <Route path="/tasks/assigned" element={<TasksAssignedPage />} />
            <Route path="/tasks/mine" element={<TasksMinePage />} />
            <Route path="/tasks/all" element={<TasksAllPage />} />
            <Route path="/tasks/:id" element={<TaskDetailPage />} />
            <Route path="/online-orders" element={<Navigate to="/tasks/mine" replace />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/messages/:id" element={<MessageDetailPage />} />
            <Route path="/style-guide" element={<MobileStyleGuidePage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  )
}
