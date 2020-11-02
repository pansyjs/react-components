import React from 'react';
import { Button } from 'antd';
// @ts-ignore
import Watermark from '@pansy/react-watermark';

export default () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: 500 }}>
      <Watermark text="测试水印" />

      <Button>测试按钮</Button>
    </div>
  )
}
