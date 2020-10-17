/**
 * title: status 属性
 * desc: 设置status字段，控制其是否开启关闭。
 */
import React, { useState } from 'react';
import { Button } from 'antd';
import { Map } from '@pansy/react-amap';

export default () => {
  const [zoomEnable, setZoomEnable] = useState<boolean>(true);

  const handleZoomEnable = () => {
    setZoomEnable(!zoomEnable)
  }

  return (
    <div style={{width: '100%', height: 500}}>
      <Map zoom={6} zoomEnable={zoomEnable} />

      <Button onClick={handleZoomEnable}>
        Toggle Zoom Enable
      </Button>
    </div>
  )
}
