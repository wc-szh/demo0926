# UX Guidelines — 拾影 Part A

## 品质标准与完成定义

**品质标准**

- 成熟 B2B SaaS（参照 Linear / Stripe Dashboard 信息层级与克制）
- 兼职端参照工具型金融 / 钱包 App 单列任务流（非 Awwwards 创意站）

**验收维度**：排版、留白、视觉层级、色彩一致性、必要微交互、375 / 1280 响应式、中文状态可读性

**完成定义（Done）**

- `docs/ui-walkthrough.md` 全部勾选
- 主路径 30 秒内可走通
- 动效仅限 hover / focus / Dialog / toast，`duration-200`

## 全局 UX 原则

| 原则 | 要求 |
|------|------|
| 信息层级 | PageHeader → 主操作区 → 内容；数字 tabular-nums |
| 密度 | Admin 表格可读；Mobile 单列、触控 ≥ 44px |
| 反馈 | 主操作 → Sonner toast；危险操作 → destructive + Dialog |
| 状态完整 | 空态、Skeleton 样例、表单 disabled/focus |
| 导航 | Admin Sidebar Badge；Mobile BottomTab + 角标 |
| 文案 | 全中文；StatusBadge 中文标签 |
| 禁止 | 渐变、玻璃拟态、假手机壳、选端页、emoji、AI 味 |

## 页面结构模板

### Admin

```
PageHeader（标题 / 描述 / 右侧主按钮）
→ 可选：筛选 Toolbar
→ DataPanel（表格或卡片）
→ Dialog / Sheet
```

### Mobile

```
可选：返回 + 标题
→ 财务条 / 主信息
→ 列表入口行
→ BottomTab（pb-20 + safe-area）
```

## 组件交互状态

| 组件 | 状态 |
|------|------|
| Button | default / hover / focus ring / disabled opacity-50 |
| Input | border-input / focus ring-2 / disabled |
| Table row | hover:bg-muted/50 |
| Switch | checked primary / unchecked input |
| Dialog | overlay + content 200ms |

## 中文状态映射

与 `packages/shared/src/types/enums.ts` 中 `STATUS_LABELS` 对齐，例如：

| 枚举 | 中文 |
|------|------|
| PENDING | 待处理 |
| IN_PROGRESS | 进行中 |
| COMPLETED | 已完成 |
| PENDING_REVIEW | 待核实 |
| APPROVED | 已通过 |
| REJECTED | 已驳回 |
| ACCEPTING | 接单中 |
| SUSPENDED | 挂起中 |

## Part A 页面走查

详见 `docs/ui-walkthrough.md`。

## 关键 UX 流（静态 fixtures）

| 流 | 路径 |
|----|------|
| 管理登录 | 5173 `/` → Dashboard |
| 兼职登录 | 5174 `/login` → `/` |
| 待办处理 | Sidebar Badge → Withdrawals / OfflineJobs / Workers |
| 新建电商单 | OnlineOrders → Dialog → toast |
| 提现审核 | Withdrawals → 通过/驳回 → toast |
| 兼职接单 | Home → 任务入口 → 列表 → 详情 |
| 申请提现 | Wallet → Dialog → toast |
