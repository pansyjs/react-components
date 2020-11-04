<h1 align="center">@pansy/react-amap</h1>

<h4 align="center">高德地图组件<h4>

基于 React 封装的高德地图组件；帮助你轻松的接入地图到 React 项目中。除了必须引用的 Map 组件外，我们目前提供了常用一些地图组件，能够基本满足大部分的业务场景。

[![NPM version](https://img.shields.io/npm/v/@pansy/react-amap.svg?style=flat)](https://npmjs.org/package/@pansy/react-amap)
[![NPM downloads](http://img.shields.io/npm/dm/@pansy/react-amap.svg?style=flat)](https://npmjs.org/package/@pansy/react-amap)

## 💎 项目由来

最近有使用高德的需求，使用饿了么封装的[react-amap](https://github.com/ElemeFE/react-amap)，主要存在以下问题：

1. 文档不全
2. 代码可读性不高
3. 类型定义不够完善
4. 坑有点多

所以对其进行重写

## ✨ 特性

* 📦 开箱即用的高质量 React 组件。
* 🛡 使用 TypeScript 开发，提供完整的类型定义文件。
* 🌈 人性化的扩展以及优化

## 🏗 安装

```
// npm
npm install @pansy/react-amap --save

// yarn
yarn add @pansy/react-amap
```

🔨 示例

```tsx
import { Map } from '@pansy/react-amap';

const App = () => (
  <div style={{ height: 500 }}>
    <Map />
  </div>
);
```

## ❤️ 感谢

- [ElemeFE/react-amap](https://github.com/ElemeFE/react-amap)
- [uiwjs/react-amap](https://github.com/uiwjs/react-amap)
