import React from 'react';
import { Map, Scale } from '@pansy/react-amap';

export default () => {
  return (
    <div>
      <div style={{width: '100%', height: 500}}>
        <Map zoom={6}>
          <Scale
            visiable={true}
            offset={[20, 10]}
            position="RB"
          />
        </Map>
      </div>
    </div>
  )
}
