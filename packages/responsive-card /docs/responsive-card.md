---
title: ResponsiveCard 自适应间距卡片
nav:
  title: 组件
  path: /components
order: 1
group:
  path: /basic
  title: '基础组件'
  order: 0
---

# ResponsiveCard 卡片自适应间距

## 何时使用

- 需要将卡片进行自适应间距时

## 代码演示

### 基础示例

<code src="../demo/demo02.tsx" />

### 自定义渲染

<code src="../demo/demo01.tsx" />


### 自定义间距

<code src="../demo/demo03.tsx" />

## API

| 参数          | 说明          | 类型                 | 默认值 | 版本 |
| ------------ | --------------| ------------------- | ------ | ---- |
| className     | 额外的样式类   | `string`     | --     | --   |
| style     | 额外的样式   | `React.CSSProperties`     | --     | --   |
| defaultWidth     | 卡片的默认宽度   | `number`     | `260`    | --  |
| gutter     | 分屏的间隔   | `number` \| `[number, number]`     | `16`    | --  |
| children | 需要展示的业务内容   | `((config: AdaptiveConfig) => React.ReactNode) | React.ReactNode`  |--  | --  |


```ts
interface AdaptiveConfig {
  /** 每项的宽度 */
  width: number;
  /** 左右间距 */
  gutter: number;
  /** 每行的数目 */
  span: number;
}
```
