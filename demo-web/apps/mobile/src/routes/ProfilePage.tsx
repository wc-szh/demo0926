import {
  getWorkerFinancials,
  getWorkerLevel,
  getWorkerTaskPipelineCounts,
  getWorkerTenureDays,
  getWorkerTotalWithdrawn,
  STATUS_LABELS,
  workers,
} from '@lingong/shared'
import { CalendarDays, ListChecks, Medal } from 'lucide-react'
import { FinancialCard } from '@/components/patterns/FinancialCard'
import { ProfileHeaderSection } from '@/components/patterns/ProfileHeaderSection'
import { TaskPipelineRow } from '@/components/patterns/TaskPipelineRow'
import { useAmountVisible } from '@/lib/amountVisible'
import { createWorkerProfileDefaults, loadWorkerProfile } from '@/lib/workerProfile'
import { resolveAvatarSrc } from '@/lib/workerAvatar'
import { cn } from '@/lib/utils'

const CURRENT_WORKER = 'w1'

const dataMetrics = [
  {
    key: 'level' as const,
    label: '当前等级',
    icon: Medal,
    iconWrap: 'bg-[#FFF1F0] text-[#FF4D4F]',
    valueClass: 'text-[#FF4D4F]',
  },
  {
    key: 'tasks' as const,
    label: '完成任务',
    icon: ListChecks,
    iconWrap: 'bg-mist-gray text-ink-black',
    valueClass: 'text-ink-black',
  },
  {
    key: 'tenure' as const,
    label: '在职天数',
    icon: CalendarDays,
    iconWrap: 'bg-mist-gray text-ink-black',
    valueClass: 'text-ink-black',
  },
]

export function ProfilePage() {
  const worker = workers.find((w) => w.id === CURRENT_WORKER)!
  const profile = loadWorkerProfile(createWorkerProfileDefaults(worker))
  const avatarSrc = resolveAvatarSrc(profile, worker.gender)
  const level = getWorkerLevel(CURRENT_WORKER)
  const fin = getWorkerFinancials(CURRENT_WORKER)
  const pipeline = getWorkerTaskPipelineCounts(CURRENT_WORKER)
  const totalWithdrawn = getWorkerTotalWithdrawn(CURRENT_WORKER)
  const { visible, toggle } = useAmountVisible()
  const tenureDays = getWorkerTenureDays(worker.joinedAt)

  const metricValues = {
    level: level?.name ?? '-',
    tasks: String(worker.completedTaskCount),
    tenure: String(tenureDays),
  }

  return (
    <div className="min-h-full space-y-3 bg-gradient-to-b from-profile-sky to-profile-gray pb-4">
      <ProfileHeaderSection
        displayName={profile.displayName}
        avatarSrc={avatarSrc}
        creditScore={worker.creditScore}
        level={level}
        completedTaskCount={worker.completedTaskCount}
      />

      <div className="space-y-3 px-3">
        <TaskPipelineRow counts={pipeline} />

        <FinancialCard
          balance={fin.balance}
          frozen={fin.frozen}
          withdrawable={fin.withdrawable}
          totalWithdrawn={totalWithdrawn}
          visible={visible}
          onToggle={toggle}
          className="bg-paper-white"
        />

        <div className="rounded-2xl border border-border bg-paper-white p-4 shadow-[var(--shadow-card)]">
          <p className="mb-3 text-sm font-medium">我的数据</p>
          <div className="grid grid-cols-3 gap-2">
            {dataMetrics.map(({ key, label, icon: Icon, iconWrap, valueClass }) => (
              <div
                key={key}
                className="flex flex-col items-center rounded-xl bg-mist-gray/35 px-2 py-3"
              >
                <div
                  className={cn(
                    'mb-2 flex h-9 w-9 items-center justify-center rounded-full',
                    iconWrap,
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </div>
                <p className={cn('text-center text-base font-semibold tabular-nums leading-tight', valueClass)}>
                  {metricValues[key]}
                  {key === 'tenure' && (
                    <span className="ml-0.5 text-xs font-normal text-muted-foreground">天</span>
                  )}
                </p>
                <p className="mt-1 text-center text-[11px] text-muted-foreground">{label}</p>
                {key === 'level' && level && (
                  <p className="mt-0.5 text-[10px] text-muted-foreground">+{level.bonusPercent}%</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-paper-white px-4 py-3 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">入职日期</span>
            <span className="font-medium">{worker.joinedAt}</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-sm">
            <span className="text-muted-foreground">在职状态</span>
            <span>{STATUS_LABELS[worker.status] ?? worker.status}</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-sm">
            <span className="text-muted-foreground">手机号</span>
            <span className="tabular-nums">{worker.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
