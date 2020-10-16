import React, { useState } from 'react';
import { Map, Circle } from '@pansy/react-amap';

export default () => {
  const [show, setShow] = useState(true);

  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? '隐藏' : '显示'}
      </button>
      <div style={{ width: '100%', height: '300px' }}>
        <Map zoom={14} center={[116.400274, 39.905812]}>
          <Circle
            visiable={show}
            radius={1000}
            strokeColor="#fff"
            strokeWeight={2}
            center={[116.39, 39.9]}
          />
        </Map>
      </div>
    </>
  );
}
