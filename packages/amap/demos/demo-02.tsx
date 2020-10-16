import React, { useState } from 'react';
import { Map, Marker } from '@pansy/react-amap';

export default () => {
  const [show, setShow] = useState(true);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? '隐藏' : '显示'}
      </button>
      <div style={{ width: '100%', height: '300px' }}>
        <Map zoom={4}>
          <Marker visiable={show} title="北京市" position={[116.405285, 39.904989]} />
          <Marker visiable={show} title="天津市" position={[117.190182, 39.125596]} />
        </Map>
      </div>
    </>
  );
}
