import React from 'react';
// @ts-ignore
import Watermark from '@pansy/react-watermark';

export default () => {
  return (
    <Watermark
      style={{ width: '100%', height: 500 }}
      text={['张某某', '2020-08-17 12:00:00', '12345678910122']}
    >
      <div />
    </Watermark>
  )
}
