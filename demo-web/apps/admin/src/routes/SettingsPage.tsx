import { useState } from 'react'
import { toast } from 'sonner'
import { depositTiers, levels, systemSettings } from '@lingong/shared'
import { PageHeader } from '@/components/patterns/PageHeader'
import { DataPanel } from '@/components/patterns/DataPanel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function SettingsPage() {
  const [baseRate, setBaseRate] = useState(String(systemSettings.baseRatePercent))
  const [minWithdraw, setMinWithdraw] = useState(String(systemSettings.minWithdrawAmount))

  return (
    <div className="space-y-6">
      <PageHeader
        title="系统设置"
        description="配置提成比例、等级、押金档位与提现参数"
        actions={
          <Button onClick={() => toast.success('设置已保存')}>保存全部</Button>
        }
      />

      <DataPanel title="提成与提现">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>基础提成比例（%）</Label>
            <Input value={baseRate} onChange={(e) => setBaseRate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>最低提现金额（元）</Label>
            <Input value={minWithdraw} onChange={(e) => setMinWithdraw(e.target.value)} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>押金说明</Label>
            <Textarea defaultValue={systemSettings.frozenDescription} rows={3} />
          </div>
        </div>
      </DataPanel>

      <DataPanel title="等级配置">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>等级名称</TableHead>
              <TableHead>加成比例</TableHead>
              <TableHead>排序</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {levels.map((l) => (
              <TableRow key={l.id}>
                <TableCell>{l.name}</TableCell>
                <TableCell>+{l.bonusPercent}%</TableCell>
                <TableCell>{l.sortOrder}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => toast.success('等级已更新')}>
          新增等级
        </Button>
      </DataPanel>

      <DataPanel title="押金档位">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>订单金额区间</TableHead>
              <TableHead className="text-right">所需冻结押金</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {depositTiers.map((t) => (
              <TableRow key={t.id}>
                <TableCell>
                  ¥{t.orderAmountMin} — {t.orderAmountMax ? `¥${t.orderAmountMax}` : '无上限'}
                </TableCell>
                <TableCell className="text-right tabular-nums">¥{t.requiredDepositFrozen}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataPanel>
    </div>
  )
}
