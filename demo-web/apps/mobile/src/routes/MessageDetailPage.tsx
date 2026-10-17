import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { MESSAGE_CATEGORY_LABELS, offlineJobs } from '@lingong/shared'
import { Button } from '@/components/ui/button'
import { getWorkerNotificationById, markNotificationRead } from '@/lib/messageUnread'
import { getTaskOfferResponse, setTaskOfferResponse } from '@/lib/messageTaskOffer'

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
      <div className="relative min-h-full overflow-hidden bg-page pb-4">
        <PageGlow />
        <div className="relative flex items-center gap-2 px-3 pb-3 pt-4">
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-paper-white text-ink-black shadow-[0_4px_16px_rgba(29,33,41,0.04)] active:opacity-80"
            onClick={() => navigate(-1)}
            aria-label="返回"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-[17px] font-semibold text-ink-black">消息详情</h1>
        </div>
        <p className="relative px-4 text-sm text-muted-foreground">消息不存在或已失效</p>
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
    <div className="relative min-h-full overflow-hidden bg-page pb-4">
      <PageGlow />
      <div className="relative flex items-center gap-2 px-3 pb-3 pt-4">
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-paper-white text-ink-black shadow-[0_4px_16px_rgba(29,33,41,0.04)] active:opacity-80"
          onClick={() => navigate(-1)}
          aria-label="返回"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-[17px] font-semibold text-ink-black">消息详情</h1>
      </div>
      <div className="relative space-y-3 px-3">
        <article className="rounded-lg bg-paper-white p-4 shadow-[0_4px_16px_rgba(29,33,41,0.04)]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-[4px] bg-mist-gray px-1.5 py-0.5 text-[10px] font-medium leading-none text-brand-blue-deep">
              {MESSAGE_CATEGORY_LABELS[notification.category]}
            </span>
            <time className="text-[11px] text-muted-foreground">
              {notification.createdAt.slice(0, 16).replace('T', ' ')}
            </time>
          </div>
          <h2 className="mt-3 text-[17px] font-semibold leading-snug text-ink-black">{notification.title}</h2>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {detailText}
          </p>

          {job && notification.taskOffer && (
            <div className="mt-4 rounded-lg bg-mist-gray/50 p-3 text-sm">
              <p className="text-xs text-muted-foreground">关联任务</p>
              <p className="mt-1 font-medium text-ink-black">{job.title}</p>
              <Link
                to={`/tasks/${job.id}`}
                className="mt-2 inline-block text-xs font-medium text-brand-blue-deep"
              >
                查看任务详情
              </Link>
            </div>
          )}

          {offerResponse === 'ACCEPTED' && (
            <p className="mt-4 rounded-lg bg-announce px-3 py-2 text-sm text-mint-green">
              您已接受该指派任务
            </p>
          )}
          {offerResponse === 'REJECTED' && (
            <p className="mt-4 rounded-lg bg-mist-gray/50 px-3 py-2 text-sm text-muted-foreground">
              您已拒绝该指派任务
            </p>
          )}

          {showTaskActions && (
            <div className="mt-4 flex gap-2">
              <Button className="flex-1" onClick={() => handleOffer('ACCEPTED')}>
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

function PageGlow() {
  return (
    <>
      <div
        className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-[#7AD4FF]/50 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-6 top-8 h-28 w-28 rounded-full bg-[#FFD56A]/40 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-12 top-24 h-36 w-36 rounded-full bg-brand-blue/25 blur-2xl"
        aria-hidden
      />
    </>
  )
}
