import { PageHeader } from '@/components/patterns/PageHeader'
import { StatusBadge } from '@/components/patterns/StatusBadge'
import { EmptyState } from '@/components/patterns/EmptyState'
import { DataPanel } from '@/components/patterns/DataPanel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'

export function MobileStyleGuidePage() {
  return (
    <div className="space-y-6 p-4">
      <PageHeader title="组件验收" description="移动端 Design System 展示" />

      <DataPanel title="Mintlify 色板">
        <div className="flex gap-3">
          <div className="h-12 flex-1 rounded-sm bg-mint-green" />
          <div className="h-12 flex-1 rounded-sm bg-ink-black" />
          <div className="h-12 flex-1 rounded-sm bg-mist-gray" />
        </div>
      </DataPanel>

      <DataPanel title="按钮与状态">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button size="sm">主按钮</Button>
            <Button size="sm" variant="outline">描边</Button>
            <Button size="sm" variant="destructive">危险</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="PENDING" />
            <StatusBadge status="COMPLETED" />
            <StatusBadge status="ACCEPTING" />
          </div>
        </div>
      </DataPanel>

      <DataPanel title="表单与开关">
        <div className="space-y-3">
          <Input placeholder="输入框" />
          <div className="flex items-center gap-2">
            <Switch defaultChecked />
            <span className="text-sm">接单开关</span>
          </div>
        </div>
      </DataPanel>

      <DataPanel title="Skeleton 与空态">
        <Skeleton className="mb-3 h-16 w-full" />
        <EmptyState title="暂无数据" />
      </DataPanel>
    </div>
  )
}
