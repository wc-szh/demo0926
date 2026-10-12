import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { formatCurrency, getWorkerFinancials, levels, workers } from '@lingong/shared'
import { PageHeader } from '@/components/patterns/PageHeader'
import { DataPanel } from '@/components/patterns/DataPanel'
import { EmptyState } from '@/components/patterns/EmptyState'
import { StatusBadge } from '@/components/patterns/StatusBadge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function WorkersPage() {
  const [search, setSearch] = useState('')
  const [levelDialog, setLevelDialog] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState('')

  const filtered = useMemo(
    () =>
      workers.filter(
        (w) =>
          w.displayName.includes(search) ||
          w.username.includes(search) ||
          w.phone.includes(search),
      ),
    [search],
  )

  const handleSaveLevel = () => {
    toast.success('等级已更新')
    setLevelDialog(null)
  }

  const handleResign = (approved: boolean) => {
    toast.success(approved ? '离职申请已通过' : '离职申请已驳回')
  }

  return (
    <div className="space-y-6">
      <PageHeader title="兼职管理" description="管理兼职人员信息与资金状态" />

      <div className="flex gap-4">
        <Input
          placeholder="搜索姓名、用户名或手机号"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <DataPanel>
        {filtered.length === 0 ? (
          <EmptyState title="未找到匹配的兼职" description="请尝试其他搜索关键词" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>兼职</TableHead>
                <TableHead>等级</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="text-right">余额</TableHead>
                <TableHead className="text-right">冻结</TableHead>
                <TableHead className="text-right">可提</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((worker) => {
                const fin = getWorkerFinancials(worker.id)
                const level = levels.find((l) => l.id === worker.levelId)
                return (
                  <TableRow key={worker.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{worker.displayName.slice(0, 1)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{worker.displayName}</p>
                          <p className="text-xs text-muted-foreground">@{worker.username}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{level?.name ?? '-'}</TableCell>
                    <TableCell>
                      <StatusBadge status={worker.status} />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{formatCurrency(fin.balance)}</TableCell>
                    <TableCell className="text-right tabular-nums">{formatCurrency(fin.frozen)}</TableCell>
                    <TableCell className="text-right tabular-nums">{formatCurrency(fin.withdrawable)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setLevelDialog(worker.id)
                            setSelectedLevel(worker.levelId)
                          }}
                        >
                          改等级
                        </Button>
                        {worker.status === 'PENDING_RESIGN' && (
                          <>
                            <Button size="sm" onClick={() => handleResign(true)}>
                              通过
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleResign(false)}>
                              驳回
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </DataPanel>

      <Dialog open={!!levelDialog} onOpenChange={() => setLevelDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>修改等级</DialogTitle>
          </DialogHeader>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger>
              <SelectValue placeholder="选择等级" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((l) => (
                <SelectItem key={l.id} value={l.id}>
                  {l.name}（+{l.bonusPercent}%）
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLevelDialog(null)}>
              取消
            </Button>
            <Button onClick={handleSaveLevel}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
