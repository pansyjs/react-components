import React from 'react';
// @ts-ignore
import Watermark from '@pansy/react-watermark';

export default () => {
  return (
    <div style={{ position: 'relative',  width: '100%', height: 500 }}>
      <Watermark
        text="测试水印"
        fontColor="red"
        rotate={-20}
      />
    </div>
  )
}
