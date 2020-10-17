/**
 * title: 3D模式地图
 * desc: 高德官方的 JSSDK V1.4.0，增加了 3D 模式。开启方式是设置viewMode属性为3D；同时，为配合对 3D 地图进行控制，还提供了地图插件ControlBar。
 */
import React from 'react';
import { Map, ControlBar } from '@pansy/react-amap';

export default () => {
  return (
    <div style={{width: '100%', height: 500}}>
      <Map zoom={14} pitch={70} viewMode="3D" center={[116.397637, 39.900001]}>
        <ControlBar />
      </Map>
    </div>
  )
}
