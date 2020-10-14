import React, { useRef } from 'react';
import { Button, Space, message } from 'antd';
// @ts-ignore
import { Map, MouseTool } from '@pansy/react-amap';

export default () => {
  // 也可通过 onCreated 事件 获取MouseTool实例
  const mouseTool = useRef<AMap.MouseTool>();

  const handleDraw = ({ obj }: any) => {
    switch(obj.CLASS_NAME) {
      case 'AMap.Marker':
        message.info(`你绘制了一个标记，坐标位置是 {${obj.getPosition()}}`);
       break;
      case 'AMap.Polygon':
        message.info(`你绘制了一个多边形，有${obj.getPath().length}个端点`);
        break;
      case 'AMap.Circle':
        message.info(`你绘制了一个圆形，圆心位置为{${obj.getCenter()}}`);
        break;
    }
  }

  const handleDrawMarker = () => {
    if (mouseTool.current){
      mouseTool.current.marker();
      message.info('准备绘制坐标点');
    }
  }

  const handleDrawRectangle = () => {
    if (mouseTool.current){
      mouseTool.current.rectangle();
      message.info('准备绘制多边形（矩形）');
    }
  }

  const handleDrawCircle = () => {
    if (mouseTool.current){
      mouseTool.current.circle();
      message.info('准备绘制圆形');
    }
  }

  const handleDrawPolygon = () => {
    if (mouseTool.current){
      mouseTool.current.polygon();
      message.info('准备绘制多边形');
    }
  }

  const handleClose = (value: boolean = false) => {
    if (mouseTool.current){
      mouseTool.current.close(value);
      message.info('关闭了鼠标工具');
    }
  }

  return (
    <div>
      <div style={{width: '100%', height: 370}}>
        <Map>
          <MouseTool ref={mouseTool} onDraw={handleDraw} />
        </Map>
      </div>
      <Space direction="horizontal">
        <Button onClick={handleDrawMarker}>绘制坐标点</Button>
        <Button onClick={handleDrawRectangle}>绘制矩形</Button>
        <Button onClick={handleDrawCircle}>绘制圆形</Button>
        <Button onClick={handleDrawPolygon}>绘制多边形</Button>
        <Button onClick={() => { handleClose() }}>关闭</Button>
        <Button onClick={() => { handleClose(true) }}>关闭并清除</Button>
      </Space>
    </div>
  )
}
