# UI Walkthrough — Part A 验收清单

> Part A = 仅前端 UI + fixtures，无 mock-api / store。

## 环境

- [x] `npm install` 成功
- [x] `npm run dev` 双端口：admin 5173、mobile 5174
- [x] `npm run build` 通过

## 管理端（http://localhost:5173）

| 页面 | 层级 | 主操作 | 空态 | 中文状态 |
|------|------|--------|------|----------|
| `/` 登录门 | [x] | [x] 一键进入 | — | [x] |
| `/dashboard` | [x] | [x] 待办跳转 | [x] 无流水提示 | [x] |
| `/workers` | [x] | [x] 改等级/离职审核 | [x] 搜索无结果 | [x] |
| `/online-orders` | [x] | [x] 新建/开始处理/同步 | [x] | [x] |
| `/offline-jobs` | [x] | [x] 三 Tab 审核 | [x] 各 Tab | [x] |
| `/orders` | [x] | [x] Tab 切换 | [x] | [x] |
| `/withdrawals` | [x] | [x] 通过/驳回 toast | [x] | [x] |
| `/settings` | [x] | [x] 表单/表格 | — | [x] |
| `/style-guide` | [x] | — | [x] Empty/Skeleton | [x] |

## 兼职端（http://localhost:5174）

| 页面 | 层级 | 主操作 | 空态 | 中文状态 |
|------|------|--------|------|----------|
| `/login` | [x] | [x] 卡片进入 | — | [x] |
| `/` 首页 | [x] | [x] Switch/任务入口 | — | [x] |
| `/tasks/public` | [x] | [x] 申请 toast | [x] | [x] |
| `/tasks/assigned` | [x] | [x] 接受/拒绝 | [x] | [x] |
| `/tasks/mine` | [x] | [x] 申请完结 | [x] | [x] |
| `/tasks/:id` | [x] | [x] 详情操作 | [x] | [x] |
| `/online-orders` | [x] | [x] 申请完结 | [x] | [x] |
| `/wallet` | [x] | [x] 提现 Dialog | [x] 无流水 | [x] |
| `/profile` | [x] | [x] 简介/作品集/离职 | — | [x] |
| `/messages` | [x] | [x] 标记已读 | [x] | [x] |
| `/style-guide` | [x] | — | [x] | [x] |

## 主路径（30 秒内）

- [x] 管理：5173 `/` → Dashboard → Sidebar 待审提现 → 通过/驳回
- [x] 兼职：5174 `/login` → 首页 → 钱包 → 提现 Dialog

## 视觉与规范

- [x] 主色靛蓝 oklch 255°，两端口 token 一致
- [x] 无大面积渐变 / AI 味元素
- [x] 金额 formatCurrency 统一
- [x] Admin ≥1280 / Mobile 375 布局正常
- [x] 无 mock-api、无 zustand（范围确认）

## UX 签收

- [x] 对照 `ux-guidelines.md` 原则
- [x] 新用户 1 分钟内可找到：待审提现、兼职钱包、接单入口
