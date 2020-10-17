---
title: ToolBar 工具条控件
nav:
  title: 组件
  path: /components
group:
  path: /amap-control
  title: '高德地图 - 控件'
  order: 40
---

## ToolBar 工具条控件

## 代码示例

### 简单使用

<code src="./demo/demo-01.tsx" />

### 简易缩放按钮

<code src="./demo/demo-02.tsx" />

## API

| 属性 |说明|类型|默认值|amap版本|
|-----|----|----|----|----|
|visiable| 是否显示 | `boolean` | `true` | -- |
|offset| 相对于地图容器左上角的偏移量，正数代表向右下偏移。 | `[number, number]` \| `{ x: number; y: number; }` \| `AMap.Pixel` | `AMap.Pixel(10,10)` | -- |
|position| 控件停靠位置 | `LT` \| `RT` \| `LB` \| `RB` | `LB` | -- |
|ruler| 标尺键盘是否可见 | `boolean` | `true` | -- |
|noIpLocate| 定位失败后，是否开启IP定位 | `boolean` | `false` | -- |
|locate| 是否显示定位按钮 | `boolean` | `false` | -- |
|liteStyle| 是否使用精简模式 | `boolean` | `false` | -- |
|direction| 方向键盘是否可见 | `boolean` | `true` | -- |
|autoPosition| 是否自动定位，即地图初始化加载完成后，是否自动定位的用户所在地， | `boolean` | `false` | -- |
|locationMarker| 自定义定位图标，值为Marker对象 | `Marker` | -- | -- |
|useNative| 是否使用高德定位sdk用来辅助优化定位效果, 仅供在使用了高德定位sdk的APP中，嵌入webview页面时使用 | `boolean` | `false` | -- |
