import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { MESSAGE_CATEGORY_LABELS, offlineJobs } from '@lingong/shared'
import { Button } from '@/components/ui/button'
import { getWorkerNotificationById, markNotificationRead } from '@/lib/messageUnread'
import { getTaskOfferResponse, setTaskOfferResponse } from '@/lib/messageTaskOffer'
import { cn } from '@/lib/utils'

const CURRENT_WORKER = 'w1'

export function MessageDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const notification = useMemo(
    () => (id ? getWorkerNotificationById(CURRENT_WORKER, id) : null),
    [id],
  )
  const [offerResponse, setOfferResponse] = useState(() =>
    id ? getTaskOfferResponse(id) : null,
  )

  useEffect(() => {
    if (!id || !notification) return
    if (!notification.read) markNotificationRead(id)
  }, [id, notification])

  if (!notification) {
    return (
      <div className="min-h-full bg-gradient-to-b from-profile-sky to-profile-gray pb-4">
        <div className="flex items-center gap-2 px-4 py-3">
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-base font-semibold">消息详情</h1>
        </div>
        <p className="px-4 text-sm text-muted-foreground">消息不存在或已失效</p>
      </div>
    )
  }

  const job = notification.taskOffer
    ? offlineJobs.find((j) => j.id === notification.taskOffer!.jobId)
    : undefined
  const showTaskActions =
    notification.taskOffer && !offerResponse && job?.status === 'PENDING_ACCEPT'
  const detailText = notification.detail ?? notification.body

  const handleOffer = (response: 'ACCEPTED' | 'REJECTED') => {
    if (!id) return
    setTaskOfferResponse(id, response)
    setOfferResponse(response)
    toast.success(response === 'ACCEPTED' ? '已接受任务' : '已拒绝任务')
  }

  return (
    <div className="min-h-full bg-gradient-to-b from-profile-sky to-profile-gray pb-4">
      <div className="flex items-center gap-2 px-4 py-3">
        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-base font-semibold">消息详情</h1>
      </div>
      <div className="space-y-3 px-3">
        <article className="rounded-2xl border border-border bg-paper-white p-4 shadow-[var(--shadow-card)]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-sm bg-[#FFF1F0] px-1.5 py-0.5 text-[10px] font-medium text-[#FF4D4F]">
              {MESSAGE_CATEGORY_LABELS[notification.category]}
            </span>
            <time className="text-xs text-muted-foreground">
              {notification.createdAt.slice(0, 16).replace('T', ' ')}
            </time>
          </div>
          <h2 className="mt-3 text-lg font-semibold leading-snug">{notification.title}</h2>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {detailText}
          </p>

          {job && notification.taskOffer && (
            <div className="mt-4 rounded-xl border border-border bg-mist-gray/25 p-3 text-sm">
              <p className="text-xs text-muted-foreground">关联任务</p>
              <p className="mt-1 font-medium">{job.title}</p>
              <Link
                to={`/tasks/${job.id}`}
                className="mt-2 inline-block text-xs font-medium text-[#FF4D4F]"
              >
                查看任务详情
              </Link>
            </div>
          )}

          {offerResponse === 'ACCEPTED' && (
            <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              您已接受该指派任务
            </p>
          )}
          {offerResponse === 'REJECTED' && (
            <p className="mt-4 rounded-xl bg-mist-gray/50 px-3 py-2 text-sm text-muted-foreground">
              您已拒绝该指派任务
            </p>
          )}

          {showTaskActions && (
            <div className="mt-4 flex gap-2">
              <Button
                className={cn('flex-1 bg-[#FF4D4F] hover:bg-[#FF4D4F]/90')}
                onClick={() => handleOffer('ACCEPTED')}
              >
                接受
              </Button>
              <Button className="flex-1" variant="outline" onClick={() => handleOffer('REJECTED')}>
                拒绝
              </Button>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}
