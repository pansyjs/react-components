/**
 * title: 动态改变属性
 * desc: 地图的动态属性在地图创建成功后可以动态的改变。
 */
import React, { useState } from 'react';
import { Button } from 'antd';
import { Map } from '@pansy/react-amap';
import { PositionType } from '@pansy/react-amap/es/types/global';

export default () => {
  const [center, setCenter] = useState<PositionType>({ longitude: 115, latitude: 30 });

  const handleChangeCenter = () => {
    setCenter({
      longitude: 115 + Math.random() * 10,
      latitude: 30 + Math.random() * 10,
    })
  }

  return (
    <div style={{width: '100%', height: 500}}>
      <Map zoom={6} center={center} />

      <Button onClick={handleChangeCenter}>
        Random Change Center
      </Button>
    </div>
  )
}
