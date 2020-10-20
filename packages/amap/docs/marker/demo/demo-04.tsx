/**
 * title: render 方法渲染标记的外观
 * desc: 高德地图的图标 content 可以设置成一个 DOM，利用这个特性我们可以用 JSX 语法非常方便的定义图标的外观；当然，在 Marker 组件里不写子组件，默认就会用高德原生的图标外观；或者你自己配置 content 属性，定制图标的外观。
 */
import React, { useState } from 'react';
import { Button } from 'antd';
import { Map, Marker } from '@pansy/react-amap';

const style = {
  border: '1px solid #000',
  color: '#fff',
  backgroundColor: '#000',
  padding: '6px',
}

export default () => {
  const [value, setValue] = useState<number>(1);

  const renderMarker = (extData: any) => {
    return <div style={style}>{extData.myLabel}</div>
  }

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
          <Marker
            position={{
              longitude: 121,
              latitude: 34
            }}
            render={renderMarker}
            extData={{ myLabel: 'A'}}
          />
        </Map>
      </div>
    </>
  );
}
