/**
 * title: 父组件为绝对定位
 */
import React from 'react';
import Watermark from '@pansy/react-watermark';

export default () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: 500, background: '#efefef' }}>
      <div style={{ position: 'absolute', top: 20, right: 20, height: 300, left: 0, width: '100%' }}>
        <Watermark text="测试水印" />
      </div>
    </div>
  )
}
