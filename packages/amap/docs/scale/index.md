---
title: Scale 比例尺控件
nav:
  title: 组件
  path: /components
group:
  path: /amap-control
  title: '高德地图 - 控件'
---

## Scale 比例尺控件

## 代码示例

### 简单使用

<code src="./demo/demo-01.tsx" />

## API

| 属性 |说明|类型|默认值|amap版本|
|-----|----|----|----|----|
|visible| 是否显示 | `boolean` | `true` | -- |
|offset| 相对于地图容器左上角的偏移量，正数代表向右下偏移。 | `[number, number]` \| `{ x: number; y: number; }` \| `AMap.Pixel` | `AMap.Pixel(10,10)` | -- |
|position| 控件停靠位置 | `LT` \| `RT` \| `LB` \| `RB` | `LB` | -- |
