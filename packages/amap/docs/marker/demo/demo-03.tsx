/**
 * title: 自定义 Marker 的外观
 * desc: 高德地图的图标 content 可以设置成一个 DOM，利用这个特性我们可以用 JSX 语法非常方便的定义图标的外观；当然，在 Marker 组件里不写子组件，默认就会用高德原生的图标外观；或者你自己配置 content 属性，定制图标的外观。
 */
import React, { useState } from 'react';
import { Button } from 'antd';
import { Map, Marker } from '@pansy/react-amap';

export default () => {
  const [value, setValue] = useState<number>(1);

  return (
    <>
      <Button onClick={() => { setValue(value + 1) }}>
        Toggle
      </Button>
      <div style={{ width: '100%', height: '500px' }}>
        <Map
          center={{longitude: 121, latitude: 34}}
          zoom={5}
        >
          <Marker position={{longitude: 120, latitude: 35 }} />
          <Marker position={{longitude: 121, latitude: 35 }} >
            A{value}
          </Marker>
        </Map>
      </div>
    </>
  );
}
