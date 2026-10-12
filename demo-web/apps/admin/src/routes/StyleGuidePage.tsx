import { PageHeader } from '@/components/patterns/PageHeader'
import { StatusBadge } from '@/components/patterns/StatusBadge'
import { EmptyState } from '@/components/patterns/EmptyState'
import { DataPanel } from '@/components/patterns/DataPanel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'

export function StyleGuidePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="组件验收" description="Design System 组件状态展示" />

      <DataPanel title="Mintlify 色板（Refero tokens）">
        <div className="flex flex-wrap gap-3">
          <div className="flex h-16 w-24 items-end rounded-sm bg-mint-green p-2 text-xs text-paper-white">mint-green</div>
          <div className="flex h-16 w-24 items-end rounded-sm bg-ink-black p-2 text-xs text-paper-white">ink-black</div>
          <div className="flex h-16 w-24 items-end rounded-sm bg-true-black p-2 text-xs text-paper-white">true-black</div>
          <div className="flex h-16 w-24 items-end rounded-sm border border-cloud-gray bg-paper-white p-2 text-xs">paper-white</div>
          <div className="flex h-16 w-24 items-end rounded-sm bg-mist-gray p-2 text-xs">mist-gray</div>
          <div className="flex h-16 w-24 items-end rounded-sm bg-cloud-gray p-2 text-xs">cloud-gray</div>
        </div>
      </DataPanel>

      <DataPanel title="按钮">
        <div className="flex flex-wrap gap-3">
          <Button>主按钮</Button>
          <Button variant="secondary">次要</Button>
          <Button variant="outline">描边</Button>
          <Button variant="destructive">危险</Button>
          <Button variant="ghost">幽灵</Button>
          <Button disabled>禁用</Button>
        </div>
      </DataPanel>

      <DataPanel title="状态徽章">
        <div className="flex flex-wrap gap-2">
          <StatusBadge status="PENDING" />
          <StatusBadge status="IN_PROGRESS" />
          <StatusBadge status="COMPLETED" />
          <StatusBadge status="REJECTED" />
          <StatusBadge status="ACTIVE" />
        </div>
      </DataPanel>

      <DataPanel title="表单">
        <div className="max-w-sm space-y-4">
          <Input placeholder="搜索关键词" />
          <div className="flex items-center gap-2">
            <Switch defaultChecked />
            <span className="text-sm">接单开关</span>
          </div>
        </div>
      </DataPanel>

      <DataPanel title="Skeleton 与空态">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-20 w-full" />
          </div>
          <EmptyState title="暂无数据" description="列表为空时的展示效果" />
        </div>
      </DataPanel>

      <Separator />
      <p className="text-sm text-muted-foreground">
        详见 docs/DESIGN.md · tokens.css · tokens.json
      </p>
    </div>
  )
}
