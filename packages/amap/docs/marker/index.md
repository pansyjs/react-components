---
title: Marker 点标记组件
nav:
  title: 组件
  path: /components
group:
  path: /amap-overlay
  title: '高德地图 - 覆盖物'
  order: 60
---

##  Marker 点标记组件

> 官方文档 [marker](https://lbs.amap.com/api/javascript-api/reference/overlay#marker)

## 何时使用

-  显示单个坐标点的时候使用

## 代码示例

### 简单使用

<code src="./demo/demo-01.tsx" />

### 动态更改 Marker 属性

<code src="./demo/demo-02.tsx" />

### 自定义 Marker 的外观

<code src="./demo/demo-03.tsx" />

### render 方法渲染标记的外观

<code src="./demo/demo-04.tsx" />

### 绑定事件

<code src="./demo/demo-05.tsx" />

## API

| 属性 |说明|类型|默认值|amap版本|
|-----|----|----|----|----|
|position| 点标记在地图上显示的位置 | `PositionType` | -- | -- |
|anchor| 设置点标记锚点。 | `string` | `top-left` | `v1.4.13` |
|offset| 点标记显示位置偏移量 | `string` | `top-left` | `v1.4.13` |


**PositionType**

```ts
type PositionType =
    AMap.LngLat |
    [number, number] |
    { lng: number; lat: number } |
    { longitude: number, latitude: number };
```


