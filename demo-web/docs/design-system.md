# 拾影 Design System

完整规范见 **[DESIGN.md](./DESIGN.md)**（Mintlify / Refero 提取）。

## Token 来源

| 文件 | 说明 |
|------|------|
| `packages/shared/src/styles/tokens.css` | Tailwind v4 `@theme` + shadcn 语义变量 |
| `packages/shared/src/styles/tokens.json` | Design Tokens JSON（Refero 格式） |

## 核心色（写死）

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-mint-green` | `#0c8c5e` | 活跃导航、链接、状态点缀 |
| `--color-ink-black` | `#08090a` | 主按钮 CTA |
| `--color-true-black` | `#000000` | 正文 |
| `--color-paper-white` | `#ffffff` | 画布 / 卡片 |
| `--color-mist-gray` | `#f2f2f2` | 边框 / 分隔 |
| `--color-cloud-gray` | `#dddddd` | 输入框边框 |

## 字体

`--font-inter`: Inter + 中文回退，全局唯一字体族。

## 圆角

- 按钮 / 输入：`4px`
- 卡片 / DataPanel：`16px`

## 动效

`duration-200`；仅 hover / focus / Dialog / toast。
