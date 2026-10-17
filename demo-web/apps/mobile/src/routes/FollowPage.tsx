import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { offlineJobs } from '@lingong/shared'
import { EmptyState } from '@/components/patterns/EmptyState'
import { MobilePageShell } from '@/components/patterns/MobilePageShell'
import { TaskJobCard } from '@/components/patterns/TaskJobCard'
import { Button } from '@/components/ui/button'
import { loadFollowedTaskIds, removeFollowedTask } from '@/lib/followedTasks'

export function FollowPage() {
  const location = useLocation()
  const [followedIds, setFollowedIds] = useState(() => loadFollowedTaskIds())

  useEffect(() => {
    setFollowedIds(loadFollowedTaskIds())
  }, [location.pathname])

  const followedJobs = useMemo(() => {
    const map = new Map(offlineJobs.map((j) => [j.id, j]))
    return followedIds.map((id) => map.get(id)).filter(Boolean) as typeof offlineJobs
  }, [followedIds])

  const handleRemove = (taskId: string) => {
    removeFollowedTask(taskId)
    setFollowedIds(loadFollowedTaskIds())
    toast.success('已从关注移除')
  }

  return (
    <MobilePageShell
      title="关注"
      subtitle={followedJobs.length > 0 ? `共 ${followedJobs.length} 个任务` : '在任务大厅点击星标收藏任务'}
    >
      {followedJobs.length === 0 ? (
        <div className="rounded-2xl bg-paper-white p-6 shadow-[0_4px_16px_rgba(29,33,41,0.04)]">
          <EmptyState title="暂无关注任务" description="关注的任务会集中展示在这里，方便随时查看与申请" />
          <Button asChild className="mt-4 w-full">
            <Link to="/tasks/public">去任务大厅</Link>
          </Button>
        </div>
      ) : (
        <ul className="space-y-3">
          {followedJobs.map((job) => (
            <li key={job.id}>
              <TaskJobCard
                job={job}
                followed
                onToggleFollow={() => handleRemove(job.id)}
                actions={
                  <Button asChild size="sm" variant="outline">
                    <Link to={`/tasks/${job.id}`}>查看详情</Link>
                  </Button>
                }
              />
            </li>
          ))}
        </ul>
      )}
    </MobilePageShell>
  )
}
