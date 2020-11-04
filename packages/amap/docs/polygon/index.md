---
title: Polygon 多边形组件
nav:
  title: 组件
  path: /components
group:
  path: /amap-overlay
  title: '高德地图 - 覆盖物'
---

## Polygon 多边形组件

> 官方文档 [polygon](https://lbs.amap.com/api/javascript-api/reference/overlay#polygon)

## 何时使用

- 需要在地图上一个多边形或者环状多边形时使用；

## 代码示例

### 简单使用

<code src="./demo/demo-01.tsx" />

## API

### 属性
| 属性 |说明|类型|默认值|amap版本|
|-----|----|----|----|----|
|visible| 是否显示 Polygon | `boolean` | true | -- |
|path| 多边形轮廓线的节点坐标数组。  支持普通多边形(Array[]) 和带孔多边形(Array[][])   | `LngLat[]、[number, number][]、LngLat[][]、[number, number][][]` | -- | -- |
|fillColor| 多边形填充颜色 | `string` | #00B2D5 | -- |
|fillOpacity| 边形填充透明度 | `number` | 0.5 | -- |
|zIndex| 覆盖物层级 | `number` | 10 | -- |
|strokeColor| 描边线条颜色 | `string` | #00D3FC | -- |
|strokeOpacity| 描边线条透明度 | `number` | 0.9 | -- |
|strokeWeight| 描边宽度 | `number` | 2 | -- |
|strokeStyle| 描边样式, 实线:solid，虚线:dashed | `dashed`或者 `solid` | solid | -- |
|strokeDasharray| 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值： 实线： [0,0,0] 虚线： [10,10] ， [10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线 点画线： [10,2,10] ， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线 | `number[]` | -- | -- |
|lineJoin| 折线拐点的绘制样式, miter 尖角, round 圆角、bevel 斜角  | `miter`、 `round` 或者 `bevel` | miter | -- |
|lineCap| 折线两端线帽的绘制样式, butt 无头, round 圆头、square 方头 | `butt`、`round` 或者 `square` | butt | -- |
|cursor| 鼠标悬停时的鼠标样式, 自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义 cursor | `string` | -- | -- |
|extData| 自定义数据, 支持JavaScript API任意数据类型，如Polygon的id等 | `any` | -- | -- |
|bubble| 是否将覆盖物的鼠标或touch等事件冒泡到地图上 | `boolean` | false | v1.3 |
|clickable| 是否支持点击 | `boolean` | true | -- |
|draggable| 设置多边形是否可拖拽移动 | `number` | false | -- |
|onHide|  Polygon 隐藏的时候触发 | `Function` | -- | -- |
|onShow|  Polygon 显示的时候触发 | `Function` | -- | -- |
|onClick| 鼠标左键单击事件 | `Function` | -- | -- |
|onDblClick|  鼠标左键双击事件 | `Function` | -- | -- |
|onRightClick|  鼠标右键单击事件 | `Function` | -- | -- |
|onMouseDown|  鼠标按下 | `Function` | -- | -- |
|onMouseUp|  鼠标抬起 | `Function` | -- | -- |
|onMouseOver|  鼠标经过 | `Function` | -- | -- |
|onMouseOut|  鼠标移出 | `Function` | -- | -- |
|onTouchStart|  触摸开始时触发事件，仅适用移动设备 | `Function` | -- | -- |
|onTouchMove| 触摸移动进行中时触发事件，仅适用移动设备 | `Function` | -- | -- |
|onTouchEnd|  触摸结束时触发事件，仅适用移动设备 | `Function` | -- | -- |
