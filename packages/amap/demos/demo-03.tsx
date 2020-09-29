import React, { useState } from 'react';
// @ts-ignore
import { Map, InfoWindow } from '@pansy/react-amap';

export default() => {
  const [show, setShow] = useState(true);
  const [content, setContent] = useState('<div>高德软件</div>');
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? '隐藏' : '显示'}
      </button>
      <input type="text" value={content} onChange={(evn) => setContent(evn.target.value)}/>
      <div style={{ width: '100%', height: '500px' }}>
        <Map zoom={14} pitch={70} viewMode="3D" center={[116.397637, 39.900001]}>
          <InfoWindow
            visiable={show}
            content={content}
          />
        </Map>
      </div>
    </>
  );
}
