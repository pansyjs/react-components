import React from 'react';
import { Player } from '@pansy/react-aliplayer';

export default  () => {
  return (
    <Player
      source="//stream7.iqilu.com/10339/upload_transcode/202002/18/202002181038474liyNnnSzz.mp4"
      options={{
        autoplay: true
      }}
      style={{
        height: 500
      }}
    />
  );
};
