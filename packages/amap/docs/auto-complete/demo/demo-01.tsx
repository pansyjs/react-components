import React, { useState, useRef, useEffect } from 'react';
import { Map, AutoComplete } from '@pansy/react-amap';

// TODO: 在Map中无法获取到Input的ref
export default () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<HTMLInputElement>();

  useEffect(() => {
    setInput(inputRef.current as HTMLInputElement);
  }, [inputRef.current]);

  return (
    <div style={{ width: '100%', height: '500px', position: 'relative' }}>
      <input style={{ position: 'absolute', top: 0, zIndex: 1 }} type="text" ref={inputRef}  />
      <Map>
        {/* <input style={{ position: 'absolute', top: 0, zIndex: 1 }} type="text" ref={inputRef}  /> */}
        <AutoComplete
          input={input}
          onSelect={(opts: any) => {
            console.log(opts)
          }}
        />
      </Map>
    </div>
  );
}
