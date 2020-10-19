import React from 'react';
import { Map, ToolBar } from '@pansy/react-amap';

export default () => {
  return (
    <div style={{width: '100%', height: 500}}>
      <Map>
        <ToolBar
          liteStyle
          offset={[10, 100]}
          position="RB"
        />
      </Map>
    </div>
  )
}
