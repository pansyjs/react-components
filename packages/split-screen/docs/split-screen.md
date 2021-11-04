---
title: SplitScreen 分屏组件
nav:
  title: 组件
  path: /components
order: 1
group:
  path: /basic
  title: '基础组件'
  order: 0
---

# SplitScreen 分屏组件

## 何时使用

- 需要将页面切割成多份展示时使用。

## 代码演示

### 基础示例

<code src="./demo/demo-01.tsx" background="#f0f2f5" />

### 场景一

<code src="./demo/demo-03.tsx" background="#f0f2f5" />

## API

| 参数          | 说明          | 类型                 | 默认值 | 版本 |
| ------------ | --------------| ------------------- | ------ | ---- |
| className     | 额外的样式类   | `string`     | --     | --   |
| style     | 额外的样式   | `React.CSSProperties`     | --     | --   |
| amount     | 当前的分屏数量   | `number`     | `4`    | --  |
| gutter     | 分屏的间隔   | `number`     | `8`    | --  |
| background | 分屏的背景色   | `string`     | `#000`    | --  |
| children | 需要展示的业务内容   | `(index: number) => React.ReactNode`  |--  | --  |
