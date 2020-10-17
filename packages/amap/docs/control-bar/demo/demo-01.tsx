import React from 'react';
import { Map, ControlBar } from '@pansy/react-amap';

export default () => {
  return (
    <div>
      <div style={{width: '100%', height: 500}}>
        <Map zoom={14} pitch={70} viewMode="3D" center={[116.397637, 39.900001]}>
          <ControlBar />
        </Map>
      </div>
    </div>
  )
}
