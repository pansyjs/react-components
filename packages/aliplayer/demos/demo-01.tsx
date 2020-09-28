import React, { FC, useEffect, useState, useMemo } from 'react';
import Player from '@pansy/react-aliplayer';

const Example: FC = () => {
  const [source, setSource] = useState<string>('');

  useEffect(() => {
    setTimeout(() => {
      setSource("//stream7.iqilu.com/10339/upload_transcode/202002/18/202002181038474liyNnnSzz.mp4");
    }, 4 * 1000)
  }, [1]);

  const handleEnded = () => {
    console.log(`source: ${source}`);
  }

  console.log(`source: ${source}`);

  return (
    <div style={{ height: 500 }}>
      <Player
        source={source}
        options={{
          autoplay: true
        }}
        onEnded={handleEnded}
      />
    </div>
  );
};

export default Example;
