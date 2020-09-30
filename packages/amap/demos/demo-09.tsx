import React, { useState } from 'react';
// @ts-ignore
import { Map, Markers } from '@pansy/react-amap';

const randomMarker = (len: number) => (
  Array(len).fill(true).map(() => ({
    position: {
      longitude: 100 + Math.random() * 30,
      latitude: 30 + Math.random() * 20,
    },
  }))
);

export default () => {
  const [markers] = useState(randomMarker(1000));

  return (
    <div>
      <div style={{width: '100%', height: 500}}>
        <Map zoom={5}>
          <Markers
            markers={markers}
            useCluster={true}
          />
        </Map>
      </div>
    </div>
  )
}
