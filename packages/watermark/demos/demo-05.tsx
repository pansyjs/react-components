import React from 'react';
import Watermark from '@pansy/react-watermark';

export default () => {
  return (
    <div style={{  position: 'relative', width: '100%', height: 500, overflowX: 'scroll' }} >
      <Watermark text={['张某某', '12345678910122']} />

      <div style={{ height: 1000 }} />
    </div>
  )
}