import React, { useRef } from 'react';
import { Button, Space } from 'antd';
// @ts-ignore
import { Map, MouseTool } from '@pansy/react-amap';

export default () => {
  // 也可通过 onCreated 事件 获取MouseTool实例
  const mouseTool = useRef<AMap.MouseTool>();

  const handleDrawMarker = () => {
    if (mouseTool.current){
      mouseTool.current.marker();
    }
  }

  return (
    <div>
      <div style={{width: '100%', height: 370}}>
        <Map>
          <MouseTool ref={mouseTool} />
        </Map>
      </div>
      <Space direction="horizontal">
        <Button onClick={handleDrawMarker}>Draw Marker</Button>
        <Button >Draw Rectangle</Button>
        <Button >Draw Circle</Button>
        <Button >Draw Polygon</Button>
        <Button >Close</Button>
      </Space>
    </div>
  )
}
