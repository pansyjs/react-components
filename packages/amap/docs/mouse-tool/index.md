---
title: MouseTool 鼠标工具
nav:
  title: 组件
  path: /components
group:
  path: /amap
  title: '高德地图'
---

## MouseTool 鼠标工具

> 高德官方文档 [MouseTool](https://lbs.amap.com/api/javascript-api/reference/plugin#AMap.MouseTool)

鼠标工具插件。通过该插件，可进行鼠标画标记点、线、多边形、矩形、圆、距离量测、面积量测、拉框放大、拉框缩小等功能。

## 何时使用

- 需要在地图上启用鼠标工具插件时使用；

## 代码示例

### 基础用法

<code src="./demo/demo-01.tsx" />

## API

| 属性 |说明|类型|默认值|
|-----|----|----|----|
|onCreated|实例创建回调|`(mouseTool: AMap.MouseTool) => void`|--|
|onDraw|鼠标工具绘制覆盖物结束时触发此事件，obj对象为绘制出来的覆盖物对象|`(obj) => void`|--|

