import React from 'react';
import { Button } from 'antd';
import { Map } from '@pansy/react-amap';
import { MapChildProps } from '@pansy/react-amap/es/types/global';

const MyMapComponent: React.FC<MapChildProps> = ({ map }) => {
  if (!map) {
    console.log('组件必须作为 Map 的子组件使用');
    return null;
  }

  const zoomIn = () => map.zoomIn()
  const zoomOut = () => map.zoomOut()

  return (
    <div style={{ position: 'absolute', top: 16, left: 16 }}>
      <Button onClick={zoomIn}>+</Button>
      <Button onClick={zoomOut}>-</Button>
    </div>
  );
}

export default () => {
  return (
    <div style={{ width: '100%', height: 500 }}>
      <Map>
        <MyMapComponent />
      </Map>
    </div>
  )
}
