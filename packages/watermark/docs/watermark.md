---
title: Watermark 水印
nav:
  title: 组件
  path: /components
order: 1
group:
  path: /basic
  title: '基础组件'
  order: 0
---

# Watermark - 水印

为页面添加水印。

**注意**

- `body` 使用 `position: fixed`
- 其他采用 `position: absolute`, 需保证父组件不能为 `position: static`

## 何时使用

- 需要给DOM添加水印时，包括但不限图片、视频。

## 代码演示

### 基础示例

<code src="../demos/demo-01.tsx" background="#f0f2f5" />

### 滚动区域

<code src="../demos/demo-05.tsx" background="#f0f2f5" />

### 文本左对齐

<code src="../demos/demo-06.tsx" background="#f0f2f5" />

### 错行展示

<code src="../demos/demo-07.tsx" background="#f0f2f5" />

### 定制样式

<code src="../demos/demo-02.tsx" background="#f0f2f5" />

### 多行水印

<code src="../demos/demo-03.tsx" background="#f0f2f5" />

### 整个页面

<code src="../demos/demo-04.tsx" background="#f0f2f5" />

### 绝对定位

<code src="../demos/demo-08.tsx" background="#f0f2f5" />

## API

| 参数          | 说明          | 类型                 | 默认值 | 版本 |
| ------------ | --------------| ------------------- | ------ | ---- |
| mode        | 渲染模式      | `interval` \| `repeat`     | `interval`     | `2.1.0`   |
| monitor      | 监听水印元素是否被篡改，被修改或者删除等操作，则重新渲染水印 | `boolean` | `true` | --   |
| text         | 水印文本        | `string` \| `string[]` |  --   | --   |
| zIndex        | 水印层级      | `number`     | `9999`     | `1.0.2`   |
| width        | 单个水印区域宽度  | `number`           | `320`    | --   |
| height      | 单个水印区域高度   | `number`           | `160` | --   |
| opacity      | 透明度          | `number`           |  `0.2`   | --   |
| rotate      | 旋转的角度        | `number`           | `20`     | --   |
| fontSize      | 字体大小          | `number`           |  `14`   | --   |
| fontWeight    | 字体粗细        | --           | `normal`   | --   |
| fontColor      | 字体颜色        | `string`      |  `#727071`   | --   |
| fontFamily    | 规定字体系列      | `string`      | `sans-serif`    | --   |
| textAlign    | 文本对齐设置      | `string`      | `center`    | --   |
