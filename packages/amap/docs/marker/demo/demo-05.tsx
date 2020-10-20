/**
 * title: 给 Marker 绑定事件
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
            onCreated={(instance) => {
              console.log('Marker 实例创建成功；如果你需要对原生实例进行操作，可以从这里开始；');
              console.log(instance);
            }}
            onClick={(e) => {
              console.log("你点击了这个图标；调用参数为：");
              console.log(e);
            }}
            onDblClick={(e) => {
              console.log("你刚刚双击了这个图标；调用参数为：");
              console.log(e);
            }}
          />
        </Map>
      </div>
    </>
  );
}
