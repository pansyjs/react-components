import React from 'react';
import { Map, ToolBar } from '@pansy/react-amap';

export default () => {
  return (
    <div style={{width: '100%', height: 500}}>
      <Map zoom={6}>
        <ToolBar
          visible={true}
          offset={[60, 10]}
          position="RB"
        />
      </Map>
    </div>
  )
}
