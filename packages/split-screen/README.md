<h1 align="center">@pansy/react-split-screen</h1>

分屏组件

## 🏗 安装

```sh
# npm 安装
npm install --save @pansy/react-split-screen

# yarn 安装
yarn add @pansy/react-split-screen
```

## 🔨 使用

```tsx
import React from 'react';
import SplitScreen from '@pansy/react-split-screen';

export default () => {
  return (
    <div style={{ height: 500 }}>
      <SplitScreen amount={4} />>
    </div>
  );
};
```
