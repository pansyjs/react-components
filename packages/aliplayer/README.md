<h1 align="center"> React AliPlayer </h1>

React component wrapper for aliplayer.

## 🏗 安装

```sh
# npm 安装
npm install --save @pansy/react-aliplayer

# yarn 安装
yarn add @pansy/react-aliplayer
```

## 🔨 使用

```tsx
import React, { FC } from 'react';
import Player from '@pansy/react-aliplayer';

const Example: FC = () => {
  return (
    <div style={{ height: 500 }}>
      <Player
        source="//vjs.zencdn.net/v/oceans.mp4"
      />
    </div>
  );
};

export default Example;
```
