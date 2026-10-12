import { toast } from 'sonner'
import { formatCurrency, formatPercent, offlineJobs, workers } from '@lingong/shared'
import { PageHeader } from '@/components/patterns/PageHeader'
import { DataPanel } from '@/components/patterns/DataPanel'
import { EmptyState } from '@/components/patterns/EmptyState'
import { StatusBadge } from '@/components/patterns/StatusBadge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function OfflineJobsPage() {
  const getWorkerName = (id?: string) => (id ? workers.find((w) => w.id === id)?.displayName ?? id : '-')

  const published = offlineJobs.filter((j) => j.status === 'PUBLISHED' || j.status === 'PENDING_ACCEPT')
  const pendingReview = offlineJobs.filter((j) => j.status === 'PENDING_REVIEW')
  const applications = offlineJobs.flatMap((j) =>
    j.applications.filter((a) => a.status === 'PENDING').map((a) => ({ ...a, jobTitle: j.title, jobId: j.id })),
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="线下任务"
        description="发布任务、审核申请与核实完结"
        actions={<Button onClick={() => toast.success('任务已创建')}>新建任务</Button>}
      />

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">任务列表</TabsTrigger>
          <TabsTrigger value="applications">申请审核</TabsTrigger>
          <TabsTrigger value="review">完结核实</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <DataPanel>
            {published.length === 0 ? (
              <EmptyState title="暂无进行中的任务" />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>任务</TableHead>
                    <TableHead>模式</TableHead>
                    <TableHead>负责人</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">提成基数</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {published.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.title}</TableCell>
                      <TableCell>
                        <StatusBadge status={job.dispatchMode} />
                      </TableCell>
                      <TableCell>{getWorkerName(job.assigneeId)}</TableCell>
                      <TableCell>
                        <StatusBadge status={job.status} />
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatCurrency(job.commissionBase)}
                        {job.finalRate ? ` · ${formatPercent(job.finalRate)}` : ''}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DataPanel>
        </TabsContent>

        <TabsContent value="applications">
          <DataPanel>
            {applications.length === 0 ? (
              <EmptyState title="暂无待审申请" />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>任务</TableHead>
                    <TableHead>申请人</TableHead>
                    <TableHead>申请时间</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>{app.jobTitle}</TableCell>
                      <TableCell>{getWorkerName(app.workerId)}</TableCell>
                      <TableCell>{app.createdAt.slice(0, 10)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => toast.success('申请已通过')}>
                            通过
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => toast.success('申请已驳回')}>
                            驳回
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DataPanel>
        </TabsContent>

        <TabsContent value="review">
          <DataPanel>
            {pendingReview.length === 0 ? (
              <EmptyState title="暂无待核实任务" />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>任务</TableHead>
                    <TableHead>负责人</TableHead>
                    <TableHead className="text-right">提成基数</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingReview.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.title}</TableCell>
                      <TableCell>{getWorkerName(job.assigneeId)}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatCurrency(job.commissionBase)} · {formatPercent(job.finalRate ?? 0)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => toast.success('核实通过，提成已入账')}>
                            核实通过
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => toast.success('已打回')}>
                            打回
                          </Button>
                        </div>
                      </TableCell>
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
