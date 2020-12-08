<h1 align="center">@pansy/react-watermark</h1>

<h4 align="center">水印组件, 基于[@pansy/watermark](https://github.com/pansyjs/watermark)的封装<h4>

**注意**

- `body` 使用 `position: fixed`
- 其他采用 `position: absolute`, 需保证父组件不能为 `position: static`

## ✨ 特性

- 🚀 支持一个页面添加多处不同水印
- 🌈 安全防御 - 防止他人删除水印dom或修改样式属性
- 🐠 支持自定义水印样式，开箱即用
- 💻 使用 TypeScript 编写，提供完善的类型定义

## 🏗 安装

```sh
// npm 安装
npm install --save @pansy/react-watermark

// yarn 安装
yarn add @pansy/react-watermark
```

## 🔨 使用

```tsx
import React from 'react';
import Watermark from '@pansy/react-watermark';

export default () => {
  return (
    <div style={{ position: 'relative', width: 500, height: '100%' }}>
      <Watermark text="测试水印" />
      <button>
        123
      </button>
    </div>
  )
}
```
