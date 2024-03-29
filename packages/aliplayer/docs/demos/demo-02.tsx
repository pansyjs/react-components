import React from 'react';
import { Player } from '@pansy/react-aliplayer';

export default () => {
  return (
    <div style={{ height: 500 }}>
      <Player
        source="https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4"
        options={{
          autoplay: true,
          rePlay: true
        }}
        hideControlbar
      />
    </div>
  );
};
