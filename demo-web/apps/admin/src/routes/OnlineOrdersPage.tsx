import { useState } from 'react'
import { toast } from 'sonner'
import { formatCurrency, formatPercent, onlineOrders, workers } from '@lingong/shared'
import { PageHeader } from '@/components/patterns/PageHeader'
import { DataPanel } from '@/components/patterns/DataPanel'
import { EmptyState } from '@/components/patterns/EmptyState'
import { StatusBadge } from '@/components/patterns/StatusBadge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function OnlineOrdersPage() {
  const [createOpen, setCreateOpen] = useState(false)
  const [syncOpen, setSyncOpen] = useState<string | null>(null)
  const [transactionCompleted, setTransactionCompleted] = useState(false)

  const getWorkerName = (id: string) => workers.find((w) => w.id === id)?.displayName ?? id

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI 视频单"
        description="管理 AI 视频派单与提成结算"
        actions={
          <Button onClick={() => setCreateOpen(true)}>新建订单</Button>
        }
      />

      <DataPanel>
        {onlineOrders.length === 0 ? (
          <EmptyState title="暂无电商订单" description="点击右上角新建第一笔订单" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>外部单号</TableHead>
                <TableHead>标题</TableHead>
                <TableHead>负责人</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>完结条件</TableHead>
                <TableHead className="text-right">提成基数</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {onlineOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">{order.externalOrderNo}</TableCell>
                  <TableCell>{order.title}</TableCell>
                  <TableCell>{getWorkerName(order.assigneeId)}</TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-xs">
                      <p>{order.workerCompletionRequested ? '✓ 兼职已申请完结' : '○ 兼职未申请'}</p>
                      <p>{order.transactionCompleted ? '✓ 交易已完成' : '○ 交易未完成'}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatCurrency(order.commissionBase)} · {formatPercent(order.finalRate)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {order.status === 'PENDING' && (
                        <Button size="sm" onClick={() => toast.success('已开始处理')}>
                          开始处理
                        </Button>
                      )}
                      {order.status === 'IN_PROGRESS' && (
                        <Button size="sm" variant="outline" onClick={() => setSyncOpen(order.id)}>
                          模拟同步
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DataPanel>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新建电商订单</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>外部单号</Label>
              <Input placeholder="TB-20261001-0001" />
            </div>
            <div className="space-y-2">
              <Label>订单标题</Label>
              <Input placeholder="订单跟进与售后" />
            </div>
            <div className="space-y-2">
              <Label>提成基数（元）</Label>
              <Input type="number" placeholder="500" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              取消
            </Button>
            <Button
              onClick={() => {
                toast.success('订单已创建')
                setCreateOpen(false)
              }}
            >
              创建
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!syncOpen} onOpenChange={() => setSyncOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>模拟交易同步</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <Checkbox
              id="tx"
              checked={transactionCompleted}
              onCheckedChange={(v) => setTransactionCompleted(v === true)}
            />
            <Label htmlFor="tx">交易已完成（transactionCompleted）</Label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSyncOpen(null)}>
              取消
            </Button>
            <Button
              onClick={() => {
                toast.success('同步状态已更新')
                setSyncOpen(null)
              }}
            >
              确认
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
