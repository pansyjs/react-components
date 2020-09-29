import React, { useState } from 'react';
// @ts-ignore
import { Map, Polygon } from '@pansy/react-amap';

export default () => {
  const [show, setShow] = useState(true);

  const path = [
    [116.403322, 39.920255],
    [116.410703, 39.897555],
    [116.402292, 39.892353],
    [116.389846, 39.891365]
  ];

  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? '隐藏' : '显示'}
      </button>
      <div style={{ width: '100%', height: '500px' }}>
        <Map zoom={14} center={[116.400274, 39.905812]}>
          <Polygon
            visiable={show}
            path={path}
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
