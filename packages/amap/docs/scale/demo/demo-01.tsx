import React, { useState } from 'react';
import { Button } from 'antd';
import { Map, Scale } from '@pansy/react-amap';

export default () => {
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <div>
      <div style={{width: '100%', height: 500}}>
        <Map>
          <Scale
            visible={visible}
            position="RB"
          />
        </Map>
      </div>

      <Button onClick={() => setVisible(!visible)}>
        {visible ? '关闭' : '开启'}
      </Button>
    </div>
  )
}
