import React from 'react';
import Watermark from '@pansy/react-watermark';

export default () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: 500 }}>
      <Watermark text={['张某某', '12345678910122']} textAlign="left" />
    </div>
  )
}
