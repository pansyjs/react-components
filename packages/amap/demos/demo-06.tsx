import React, { useState } from 'react';
// @ts-ignore
import { Map, Rectangle } from '@pansy/react-amap';

export default () => {
  const [show, setShow] = useState(true);
  // const southWest = new AMap.LngLat(108.245573, 39.027206);
  // const northEast = new AMap.LngLat(116.485319, 26.666506);
  // const bounds = new AMap.Bounds(southWest, northEast);

  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? '隐藏' : '显示'}
      </button>
      <div style={{ width: '100%', height: '300px' }}>
        <Map zoom={4}>
          <Rectangle
            visiable={show}
            // bounds={bounds}
            strokeColor="red"
            strokeWeight={6}
            strokeOpacity={0.5}
            strokeDasharray={[30, 10]}
            strokeStyle="dashed"
            fillColor="blue"
            fillOpacity={0.5}
            cursor="pointer"
            zIndex={50}
          />
        </Map>
      </div>
    </>
  );
}
