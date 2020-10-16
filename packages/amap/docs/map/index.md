---
title: Map 地图
nav:
  title: 组件
  path: /components
order: 3
group:
  path: /amap
  title: '高德地图'
  order: 1
---

# Map 地图

> 官方文档 [map](https://lbs.amap.com/api/javascript-api/reference/map)

Map 组件是其他组件的基础，其他地图组件必须作为 Map 的子组件使用，Map 组件会给所有的子组件注入两个属性 `map`，`AMap`，在拥有访问这两个属性的能力后，就可以根据高德原生 API 做高德允许你做的一切事情。

## 何时使用

-  在需要显示地图的地方使用；

## 代码示例

### 基础用法

Map 的父组件必须具有宽度和高度；

<code src="./demo/demo-01.tsx" />

### 事件绑定

<code src="./demo/demo-03.tsx" />

### 在 Map 下添加自定义地图组件

<code src="./demo/demo-02.tsx" />

### 地图加载过渡样式

<code src="./demo/demo-04.tsx" />

### 加载 AMapUI 组件库

<code src="./demo/demo-05.tsx" />

## API

| 属性 |说明|类型|默认值|amap版本|
|-----|----|----|----|----|
|classname| 额外的样式类 | `string` | -- | -- |
|style| 额外的样式 | `React.CSSProperties` | -- | -- |
|loading| 地图加载中的UI | `React.ReactNode` | -- | -- |
|options| 地图加载相关配置, 具体配置请看下面的 `Options` | `object` | -- | -- |
|center|地图中心点坐标值|`LngLat` \| `[number, number]` \| `{ lng: number; lat: number }` \| `{ longitude: number, latitude: number }`| --| -- |
|onComplete|地图资源加载完成后触发事件|`() => void`| -- | -- |
|onClick|鼠标左键单击事件|`(event) => void`| -- | -- |
|onRightClick|鼠标右键单击事件|`(event) => void`| -- | -- |
|onRdblclick|鼠标左键双击事件|`(event) => void`| -- | -- |
|onMouseUp|鼠标在地图上单击抬起时触发|`(event) => void`| -- | -- |
|onMouseDown|鼠标在地图上单击按下时触发|`(event) => void`| -- | -- |
|onMouseMove|鼠标在地图上移动时触发|`(event) => void`| -- | -- |
|onMouseWheel|鼠标滚轮开始缩放地图时触发|`(event) => void`| -- | -- |
|onMouseOver|鼠标移入地图容器内时触发|`(event) => void`| -- | -- |
|onMouseOut|鼠标移出地图容器时触发|`(event) => void`| -- | -- |
|onTouchStart|触摸开始时触发事件，仅适用移动设备|`(event) => void`| -- | -- |
|onTouchMove|触摸移动进行中时触发事件，仅适用移动设备|`(event) => void`| -- | -- |
|onTouchEnd|触摸结束时触发事件，仅适用移动设备|`(event) => void`| -- | -- |
|onHotspotClick|鼠标点击热点时触发|`(event) => void`| -- | `v1.3` |
|onHotspotOver|鼠标滑过热点时触发|`(event) => void`| -- | `v1.3` |
|onHotspotOut|鼠标移出热点时触发|`(event) => void`| -- | `v1.3` |
|onMapMove|地图平移时触发事件|`() => void`| -- | -- |
|onMoveStart|地图平移开始时触发|`() => void`| -- | -- |
|onMoveEnd|地图移动结束后触发，包括平移，以及中心点变化的缩放。如地图有拖拽缓动效果，则在缓动结束后触发|`() => void`| -- | -- |
|onZoomChange|地图缩放级别更改后触发|`() => void`| -- | -- |
|onZoomStart|缩放开始时触发|`() => void`| -- | -- |
|onZoomEnd|缩放停止时触发|`() => void`| -- | -- |
|onDragStart|开始拖拽地图时触发|`() => void`| -- | -- |
|onDragging|拖拽地图过程中触发|`() => void`| -- | -- |
|onDragEnd|停止拖拽地图时触发。如地图有拖拽缓动效果，则在拽停止，缓动开始前触发|`() => void`| -- | -- |
|onResize|地图容器大小改变事件|`() => void`| -- | -- |


更多参数请查看 [map](https://lbs.amap.com/api/javascript-api/reference/map)

**注意:** 

- 组件对 center 进行了扩展，兼容了常见的经纬度数据格式。
- 组件对高德地图时间做了统一加了on前缀，并采用驼峰的形式，其他使用方式与高德官方文档完全一致。

**Options**

| 属性 |说明|类型|默认值|
|-----|----|----|----|
|key| 加载高德 API 使用的 Key | `string` | -- |
|version| 加载的高德 API 的版本 | `string` | `1.4.15` |
|plugins| 需要加载的地图插件 | `string[]` | `[]` |
|AMapUI| 加载 AMapUI 配置 | `{ version: string; plugins: string[] }` | `{ version: '1.1', plugins: [] }` |
|Loca| 加载 Loca 配置 | `{ version: string; }` | `{ version: '1.3.2' }` |
|hostAndPath| 加载高德API的前半部分 |`string`|`webapi.amap.com`|


