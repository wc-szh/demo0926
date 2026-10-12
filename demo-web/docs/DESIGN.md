# 拾影 DESIGN.md

> 参照 [Refero · Mintlify](https://styles.refero.design/style/80d7ef36-ed7e-48bb-b558-f772eb40106f)  
> 近全单色界面：白底、近黑正文、**薄荷绿 `#0c8c5e`** 为唯一功能点缀色；主 CTA 使用 **墨黑 `#08090a`** 填充。

## Color Palette

| Name | Value | CSS Variable | Role |
|------|-------|--------------|------|
| Mint Green | `#0c8c5e` | `--color-mint-green` | 品牌链接、活跃导航、功能图标、关键数字 |
| Ink Black | `#08090a` | `--color-ink-black` | 主按钮填充、标题、强对比 UI |
| True Black | `#000000` | `--color-true-black` | 正文、默认链接、图标描边 |
| Paper White | `#ffffff` | `--color-paper-white` | 页面画布、卡片表面、输入框底 |
| Mist Gray | `#f2f2f2` | `--color-mist-gray` | 分隔线、浅底 hover、卡片描边 |
| Cloud Gray | `#dddddd` | `--color-cloud-gray` | 输入框边框、hover 轮廓 |

## Typography

- **Font**: `Inter`（`--font-inter`），中文回退 PingFang SC / Microsoft YaHei
- **Weights**: 400 / 500 / 600
- **Letter spacing**: 大标题 -0.02em；正文 -0.01em；eyebrow 标签 +0.05em
- **OpenType**: `"ss01" on, "cv11" on`
- 金额：`tabular-nums`

## Spacing & Shape

| Element | Radius |
|---------|--------|
| buttons / inputs / tags | 4px (`rounded-sm`) |
| cards / panels | 16px (`rounded-2xl`) |
| large containers | 24px |

| Layout | Value |
|--------|-------|
| Admin max-width | 1280px (`max-w-7xl`) |
| Mobile max-width | 448px (`max-w-md`) |
| Section gap | 24–32px (`gap-6`) |
| Card padding | 24px (`p-6`) |

## Shadows

```css
--shadow-sm: lab(2.42579 -0.165291 -0.470081 / 0.03) 0px 2px 4px 0px;
--shadow-card: lab(100 0 0 / 0.05) 0px 2px 4px 0px;
```

需要更多分离时用 `1px var(--color-cloud-gray)` 边框，而非加深阴影。

## Tailwind v4 `@theme`

```css
@theme {
  --color-mint-green: #0c8c5e;
  --color-ink-black: #08090a;
  --color-true-black: #000000;
  --color-paper-white: #ffffff;
  --color-mist-gray: #f2f2f2;
  --color-cloud-gray: #dddddd;
  --font-inter: 'Inter', ui-sans-serif, system-ui, ...;
}
```

实现文件：`packages/shared/src/styles/tokens.css`  
机器可读 token：`packages/shared/src/styles/tokens.json`

## Do

- Inter 全局统一，无第二 display 字体
- 薄荷绿仅用于活跃态、链接、图标、eyebrow — **不做按钮大底、不做大面积铺色**
- 主按钮：墨黑底 + 白字 + 4px 圆角
- 卡片 16px 圆角，白底 + mist 边框
- 阴影 3–5% 透明度，克制使用

## Don't

- 不用 pill 按钮（9999px 圆角）
- 不用第二 accent 色
- 不用渐变 Hero、玻璃拟态、彩色阴影
- 正文不小于 14px，行高不低于 1.5
- 内容区背景保持纯白，不用 off-white 画布

## 组件映射（拾影）

| 组件 | 样式 |
|------|------|
| 主按钮 `Button default` | `bg-ink-black` / `text-paper-white` |
| 链接 `Button link` | `text-mint-green` |
| 活跃导航 | `text-mint-green` + `bg-accent`（6% 薄荷绿） |
| Switch / Checkbox checked | `bg-mint-green` |
| StatusBadge 进行中 | 薄荷绿浅底 + 绿字 |
| Auth Hero 顶栏 | `bg-mint-green`（登录页唯一彩色面） |

## Quick Color Reference

```
accent / brand:  #0c8c5e  (--color-mint-green)
CTA fill:        #08090a  (--color-ink-black)
text:            #000000  (--color-true-black)
background:      #ffffff  (--color-paper-white)
border:          #f2f2f2  (--color-mist-gray)
input border:    #dddddd  (--color-cloud-gray)
```
