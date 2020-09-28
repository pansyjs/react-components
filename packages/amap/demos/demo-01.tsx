import React, { useState } from 'react';
// @ts-ignore
import { Map } from '@pansy/react-amap';

const ChildernOne: React.FC<any> = (props) => {
  console.log(props);
  return (
    <div>
      ChildOne
    </div>
  )
}

export default () => {
  const [zoom, setZoom] = useState<number>(15);

  return (
    <div style={{ height: 500 }}>
      <Map loading={'loading'} zoom={zoom}>
        <ChildernOne />
      </Map>

      <button onClick={() => { setZoom(zoom + 1) }}>+</button>
      <button onClick={() => { setZoom(zoom - 1) }}>-</button>
    </div>
  );
};

