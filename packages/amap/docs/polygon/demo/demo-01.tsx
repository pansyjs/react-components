import React, { useState } from 'react';
import { Button } from 'antd';
import { Map, Polygon } from '@pansy/react-amap';

export default () => {
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <>
      <Button onClick={() => setVisible(!visible)}>
        {visible ? '隐藏' : '显示'}
      </Button>
      <div style={{ width: '100%', height: '500px' }}>
        <Map zoom={14}>
          <Polygon
            visible={visible}
            path={[
              [116.403322, 39.920255],
              [116.410703, 39.897555],
              [116.402292, 39.892353],
              [116.389846, 39.891365]
            ]}
            strokeColor="#FF33FF"
            strokeWeight={6}
            strokeOpacity={0.2}
            fillOpacity={0.4}
            fillColor="#1791fc"
            zIndex={50}
          />
        </Map>
      </div>
    </>
  );
}
