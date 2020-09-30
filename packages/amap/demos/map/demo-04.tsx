import React from 'react';
// @ts-ignore
import { Map } from '@pansy/react-amap';

export default () => {
  return (
    <div style={{ width: '100%', height: 500 }}>
      <Map
        plugins={[
          // 地图类型切换插件
          'MapType',
          // 比例尺插件
          'Scale',
          // 鹰眼控件
          {
            name: 'OverView',
            options: {
              isOpen: true,
              onCreated: (ins: any) =>{
                console.log(ins);
              }
            }
          },
          {
            name: 'ControlBar',
            options: {
              position: 'LT',
              onCreated: (ins: any) =>{
                console.log(ins);
              }
            }
          },
          {
            name: 'ToolBar',
            options: {
              position: 'LB',
              onCreated: (ins: any) =>{
                // console.log(ins);
              }
            }
          }
        ]}
      />
    </div>
  )
}
