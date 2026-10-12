# 拾影 demo-web

灵活用工协作与结算平台 — **Part A：仅前端 UI**（admin + mobile，静态 fixtures）。

## 应用与端口

| 应用 | 目录 | 端口 | URL |
|------|------|------|-----|
| 管理端 | `apps/admin` | 5173 | http://localhost:5173/ |
| 兼职端 | `apps/mobile` | 5174 | http://localhost:5174/login |

无统一入口页；两端口独立演示，**数据不同步**（fixtures 静态）。

## 快速开始

```bash
npm install
npm run dev          # 同时启动 admin + mobile
npm run dev:admin    # 仅 5173
npm run dev:mobile   # 仅 5174
npm run build
```

## 仓库结构

```
demo-web/
├── apps/admin/          # 管理端 React + Vite + shadcn
├── apps/mobile/         # 兼职端 H5
├── packages/shared/     # types、fixtures、format、tokens.css
└── docs/                # design-system、ux-guidelines、ui-walkthrough
```

## 当前阶段（Part A）

- ✅ 双应用全部路由页面 UI
- ✅ shadcn + Design System（靛蓝主色）
- ✅ fixtures 填充表格/卡片/图表
- ✅ Dialog、Tabs、toast 等 UI 交互（本地 state）
- ❌ mock-api、Zustand store、跨端同步（Part B）

## 文档

- [design-system.md](docs/design-system.md) — 视觉 token 与禁止项
- [ux-guidelines.md](docs/ux-guidelines.md) — 交互与走查原则
- [ui-walkthrough.md](docs/ui-walkthrough.md) — 验收勾选表
- [product-spec.md](docs/product-spec.md) — 业务规则备查（Part B）

## 共享包

```ts
import { workers, formatCurrency, STATUS_LABELS } from '@lingong/shared'
```

Fixtures 位于 `packages/shared/src/fixtures/`。
