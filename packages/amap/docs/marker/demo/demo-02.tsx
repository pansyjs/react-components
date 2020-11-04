import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { Map, Marker } from '@pansy/react-amap';

export default () => {
  const [visible, setVisible] = useState<boolean>(true);
  const [clickable, setClickable] = useState<boolean>(false);
  const [draggable, setDraggable] = useState<boolean>(false);
  const [position, setPosition] = useState<AMap.PositionType>({ longitude: 120, latitude: 35 });

  return (
    <>
      <div style={{ width: '100%', height: '500px' }}>
        <Map zoom={4}>
          <Marker
            visible={visible}
            title="北京市"
            position={position}
            clickable={clickable}
            draggable={draggable}
          />
        </Map>
        <Space>
          <Button onClick={() => setVisible(!visible)}>
            visible
          </Button>

          <Button
            onClick={() => {
              setPosition({
                longitude: 120 + Math.random() * 10 ,
                latitude: 35 + Math.random() * 10
              });
            }}
          >
            position
          </Button>

          <Button onClick={() => setClickable(!clickable)}>
            clickable
          </Button>

          <Button onClick={() => setDraggable(!draggable)}>
            draggable
          </Button>
        </Space>
      </div>
    </>
  );
}
