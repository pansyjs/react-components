import React from 'react';
// @ts-ignore
import Watermark from '@pansy/react-watermark';

export default () => {
  return (
    <Watermark
      style={{ width: '100%', height: 500 }}
      text="测试水印"
      options={{
        fontColor: 'red',
        rotate: -20
      }}
    >
      <div />
    </Watermark>
  )
}
