import React, { useState } from 'react';
import { Button } from 'antd';
import { Map, MapType } from '@pansy/react-amap';

export default () => {
  const [visiable, setVisiable] = useState<boolean>(true);

  return (
    <div>
      <div style={{width: '100%', height: 500}}>
        <Map zoom={6}>
          <MapType visiable={visiable} />
        </Map>
      </div>
      <Button onClick={() => setVisiable(!visiable)}>
        {visiable ? '关闭' : '开启'}
      </Button>
    </div>
  )
}
