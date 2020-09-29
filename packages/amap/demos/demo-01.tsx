import React, { useState } from 'react';
// @ts-ignore
import { Map } from '@pansy/react-amap';

const ChildernOne: React.FC<any> = (props) => {
  return (
    <div>
      ChildOne
    </div>
  )
}

export default () => {
  const [zoom, setZoom] = useState<number>(15);
  const [zoomEnable, setZoomEnable] = useState<boolean>(true);

  return (
    <div style={{ height: 500 }}>
      <Map loading={'loading'} zoomEnable={zoomEnable} zoom={zoom}>
        <ChildernOne />
      </Map>

      <button onClick={() => { setZoom(zoom + 1) }}>+</button>
      <button onClick={() => { setZoom(zoom - 1) }}>-</button>

      <button onClick={() => { setZoomEnable(!zoomEnable) }}>
       zoomEnable
        { zoomEnable + ''}
      </button>
    </div>
  );
};

