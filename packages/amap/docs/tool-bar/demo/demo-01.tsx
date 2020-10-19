import React from 'react';
import { Map, ToolBar } from '@pansy/react-amap';

export default () => {
  return (
    <div style={{width: '100%', height: 500}}>
      <Map zoom={6}>
        <ToolBar
          visible={true}
          position="LT"
        />
      </Map>
    </div>
  )
}
