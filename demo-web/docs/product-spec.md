# Product Spec（Part B 实现备查）

本文档记录业务规则概要，**Part A 仅 UI + fixtures，不实现以下逻辑**。

## 核心实体

- 兼职（Worker）：等级、余额、冻结、接单模式、离职状态
- 电商订单（OnlineOrder）：双条件完结（兼职申请 + transactionCompleted）
- 线下任务（OfflineJob）：指派 / 公开申请、申请审核、完结核实
- 提现（Withdrawal）：手续费、审核流程
- 流水（LedgerEntry）：提成入账、提现扣款

## 业务规则要点（Part B）

1. **未完结单**：电商 PENDING/IN_PROGRESS；线下 PENDING_ACCEPT/IN_PROGRESS/PENDING_REVIEW
2. **电商完结**：兼职申请完结 + 管理端标记 transactionCompleted
3. **提成计算**：基础比例 + 等级加成（R1 规则见完整 spec）
4. **挂起**：兼职可切换接单状态
5. **提现**：最低金额、手续费、管理端审核
6. **离职**：15 天冷却期

## Part B 交付物

- `mock-api`（:3999）
- `useAppStore`、`calculations.ts`、`stateApi.ts`
- `docs/api-contract.md`、`docs/ux-signoff.md`
- 跨端 admin ↔ mobile 数据同步

完整规则见原计划 `demo-web_兼职平台_01a7dc6a.plan.md`。
