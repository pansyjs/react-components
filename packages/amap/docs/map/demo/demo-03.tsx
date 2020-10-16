import React from 'react';
import { Map } from '@pansy/react-amap';

export default () => {
  return (
    <div style={{ width: '100%', height: 500 }}>
      <Map
        onClick={(e) => {
          console.log('click event')
        }}
        onDblClick={(e) => {
          console.log('dblClick event')
        }}
      />
    </div>
  )
}
