import React from 'react';
import { Map } from '@pansy/react-amap';

export default () => {
  return (
    <div style={{ width: '100%', height: 500 }}>
      <Map
        onClick={() => {
          console.log('click event')
        }}
        onDblClick={() => {
          console.log('dblClick event')
        }}
      />
    </div>
  )
}
