import React from 'react';
import { Map } from '@pansy/react-amap';

const loadingStyle: React.CSSProperties = {
  position: 'relative',
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export default () => {
  const Loading = <div style={loadingStyle}>Loading Map...</div>

  return (
    <div style={{ width: '100%', height: 500 }}>
      <Map loading={Loading} />
    </div>
  )
}
