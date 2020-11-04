import React from 'react';
import { Map, OverView } from '@pansy/react-amap';

export default () => {
  return (
    <div style={{width: '100%', height: 500}}>
      <Map zoom={6}>
        <OverView
          visible={true}
          isOpen
        />
      </Map>
    </div>
  )
}
