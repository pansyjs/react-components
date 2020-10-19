import React, { useState } from 'react';
import { Map, Marker } from '@pansy/react-amap';

export default () => {
  const [show, setShow] = useState(true);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? '隐藏' : '显示'}
      </button>
      <div style={{ width: '100%', height: '500px' }}>
        <Map zoom={4}>
          <Marker visible={show} title="北京市" position={[116.405285, 39.904989]} />
        </Map>
      </div>
    </>
  );
}
