import React from 'react';
import Watermark from '@pansy/react-watermark';

export default () => {
  return (
    <Watermark style={{ width: '100%', height: 500 }} text="测试水印">
      <div>
        <button>
          123
        </button>
      </div>
    </Watermark>
  )
}
