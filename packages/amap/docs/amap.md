---
title: Map 地图组件
nav:
  title: 组件
  path: /components
order: 3
group:
  path: /amap
  title: '高德地图'
  order: 1
---

# Map 地图组件

Map 组件是其他组件的基础，Map 组件会给所有的子组件注入两个属性 `map`，`AMap`

## 何时使用

-  在需要显示地图的地方使用；

## 代码示例

### 基础用法

Map 的父组件必须具有宽度和高度；

<code src="../demos/map/demo-01.tsx" />

### Map 中 plugins 的使用

<code src="../demos/map/demo-04.tsx" />

### 事件绑定

<code src="../demos/map/demo-03.tsx" />

### 在 Map 下添加自定义地图组件

<code src="../demos/map/demo-02.tsx" />

## API

| 属性 |说明|类型|默认值|
|-----|----|----|----|
|classname| 额外的样式类 | `string` | -- |
|style| 额外的样式 | `React.CSSProperties` | -- |
|loading| 地图加载中的UI | `React.ReactNode` | -- |
|options| 地图加载相关配置 | `object` | -- |
|center|地图中心点坐标值|`LngLat` \| `[number, number]` \| `{ lng: number; lat: number }` \| `{ longitude: number, latitude: number }`| --|

更多参数请查看 [map](https://lbs.amap.com/api/javascript-api/reference/map)

options

| 属性 |说明|类型|默认值|
|-----|----|----|----|
|mapKey| 加载高德 API 使用的 Key | `string` | -- |
|version| 加载的高德 API 的版本 | `string` | `1.4.15` |
|mapUI| 是否加载 AMapUI 组件库 | `boolean` | `false` |
|protocol| 加载高德 API 的协议前缀 | `http` \| `https` | -- |
|hostAndPath| 加载高德API的前半部分 |`string`|`webapi.amap.com/maps`|

## Event

| 事件名称 |说明|类型|
|-----|----|----|
|onComplete|地图资源加载完成后触发事件|--|


