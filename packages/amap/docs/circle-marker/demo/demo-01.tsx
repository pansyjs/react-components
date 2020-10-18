import React, { useState } from 'react';
import { Map, CircleMarker } from '@pansy/react-amap';

export default () => {
  const [show, setShow] = useState(true);
  return (
   <>
      <button onClick={() => setShow(!show)}>
        {show ? '隐藏' : '显示'}
      </button>
      <div style={{ width: '100%', height: '400px' }}>
        <Map zoom={4} center={[116.400274, 39.905812]}>
          <CircleMarker
            center={[116.407394, 39.904211]}
            visible={show}
            radius={10+Math.random()*10}
            strokeColor="#fff"
            strokeWeight={2}
            strokeOpacity={0.5}
            fillColor='rgba(0,0,255,1)'
            fillOpacity={0.5}
            zIndex={10}
            bubble={true}
            cursor='pointer'
            clickable= {true}
          />
           <CircleMarker
            center={[113.26641, 23.132324]}
            visible={show}
            radius={10+Math.random()*10}
            strokeColor="#fff"
            strokeWeight={2}
            strokeOpacity={0.5}
            fillColor='rgba(0,0,255,1)'
            fillOpacity={0.5}
            zIndex={10}
            bubble={true}
            cursor='pointer'
            clickable= {true}
          />
           <CircleMarker
            center={[112.562678, 37.873499]}
            visible={show}
            radius={10+Math.random()*10}
            strokeColor="#fff"
            strokeWeight={2}
            strokeOpacity={0.5}
            fillColor='rgba(0,0,255,1)'
            fillOpacity={0.5}
            zIndex={10}
            bubble={true}
            cursor='pointer'
            clickable= {true}
          />
           <CircleMarker
            center={[121.473662, 31.230372]}
            visible={show}
            radius={10+Math.random()*10}
            strokeColor="#fff"
            strokeWeight={2}
            strokeOpacity={0.5}
            fillColor='rgba(0,0,255,1)'
            fillOpacity={0.5}
            zIndex={10}
            bubble={true}
            cursor='pointer'
            clickable= {true}
          />
           <CircleMarker
            center={[117.329949, 31.733806]}
            visible={show}
            radius={10+Math.random()*10}
            strokeColor="#fff"
            strokeWeight={2}
            strokeOpacity={0.5}
            fillColor='rgba(0,0,255,1)'
            fillOpacity={0.5}
            zIndex={10}
            bubble={true}
            cursor='pointer'
            clickable= {true}
          />
        </Map>
      </div>
    </>
  );
}
