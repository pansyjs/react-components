import React from 'react';
import { Map, MapType } from '@pansy/react-amap';

export default () => {
  return (
    <div>
      <div style={{width: '100%', height: 500}}>
        <Map zoom={6}>
          <MapType
            visiable={true}
            offset={[10, 10]}
            position="RB"
          />
        </Map>
      </div>
    </div>
  )
}
