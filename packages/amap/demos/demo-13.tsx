import React from 'react';
// @ts-ignore
import { Map, HawkEye } from '@pansy/react-amap';

export default () => {
  return (
    <div>
      <div style={{width: '100%', height: 500}}>
        <Map zoom={6}>
          <HawkEye
            visiable={true}
            offset={[50, 10]}
          />
        </Map>
      </div>
    </div>
  )
}
