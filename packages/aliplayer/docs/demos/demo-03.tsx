import React from 'react';
import { Player } from '@pansy/react-aliplayer';

export default () => {
  return (
    <div style={{ height: 500 }}>
      <Player
        source="//stream7.iqilu.com/10339/upload_transcode/202002/18/202002181038474liyNnnSzz.mp4"
        isLive
        options={{
          autoplay: true,
          rePlay: true
        }}
      />
    </div>
  );
};
