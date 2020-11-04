import React, { useState } from 'react';
import { Button } from 'antd';
import { Map, MapType } from '@pansy/react-amap';

export default () => {
  const [visible, setvisible] = useState<boolean>(true);

  return (
    <div>
      <div style={{width: '100%', height: 500}}>
        <Map zoom={6}>
          <MapType visible={visible} />
        </Map>
      </div>
      <Button onClick={() => setvisible(!visible)}>
        {visible ? '关闭' : '开启'}
      </Button>
    </div>
  )
}
