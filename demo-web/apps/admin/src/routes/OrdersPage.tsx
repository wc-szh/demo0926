import { formatCurrency, offlineJobs, onlineOrders, workers } from '@lingong/shared'
import { PageHeader } from '@/components/patterns/PageHeader'
import { DataPanel } from '@/components/patterns/DataPanel'
import { EmptyState } from '@/components/patterns/EmptyState'
import { StatusBadge } from '@/components/patterns/StatusBadge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function OrdersPage() {
  const getWorkerName = (id: string) => workers.find((w) => w.id === id)?.displayName ?? id

  return (
    <div className="space-y-6">
      <PageHeader title="任务总览" description="AI 视频与实拍任务统一查看" />

      <Tabs defaultValue="online">
        <TabsList>
          <TabsTrigger value="online">AI 视频</TabsTrigger>
          <TabsTrigger value="offline">线下任务</TabsTrigger>
        </TabsList>

        <TabsContent value="online">
          <DataPanel>
            {onlineOrders.length === 0 ? (
              <EmptyState title="暂无线上订单" />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>单号</TableHead>
                    <TableHead>标题</TableHead>
                    <TableHead>负责人</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">提成基数</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {onlineOrders.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell className="font-mono text-xs">{o.externalOrderNo}</TableCell>
                      <TableCell>{o.title}</TableCell>
                      <TableCell>{getWorkerName(o.assigneeId)}</TableCell>
                      <TableCell>
                        <StatusBadge status={o.status} />
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{formatCurrency(o.commissionBase)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DataPanel>
        </TabsContent>

        <TabsContent value="offline">
          <DataPanel>
            {offlineJobs.length === 0 ? (
              <EmptyState title="暂无线下任务" />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>任务</TableHead>
                    <TableHead>模式</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">提成基数</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {offlineJobs.map((j) => (
                    <TableRow key={j.id}>
                      <TableCell>{j.title}</TableCell>
                      <TableCell>
                        <StatusBadge status={j.dispatchMode} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={j.status} />
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{formatCurrency(j.commissionBase)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DataPanel>
        </TabsContent>
      </Tabs>
    </div>
  )
}
