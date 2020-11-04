/**
 * title: 错行展示
 * desc: 设置 mode = 'interval' 开启
 */
import React, { useState } from 'react';
import { Button } from 'antd';
import Watermark from '@pansy/react-watermark';
import { WatermarkComponentProps } from '@pansy/react-watermark/es';

export default () => {
  const [mode, setMode] = useState<WatermarkComponentProps['mode']>('interval');

  return (
    <div style={{ position: 'relative', width: '100%', height: 500 }}>
      <Watermark text="测试水印" width={211} height={211} mode={mode} />

      <Button
        onClick={() => { mode === 'interval' ?  setMode('repeat') : setMode('interval') }}
      >
        {mode === 'interval' ? '重复' : '间隔'}
      </Button>
    </div>
  )
}
