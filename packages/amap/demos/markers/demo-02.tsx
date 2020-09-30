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
  const [markers] = useState(randomMarker(100));
  const [useCluster, setUseCluster] = useState<boolean>(true);

  return (
    <div style={{width: '100%', height: 500}}>
      <Map zoom={5}>
        <Markers
          markers={markers}
          useCluster={useCluster}
        />
      </Map>
      <button onClick={ () => { setUseCluster(!useCluster) } }> Toggle Cluster {useCluster + ''}</button>
    </div>
  )
}
