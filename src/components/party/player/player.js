import React from 'react';
import Video from './Video';

function Player({ activeVideo, player }) {
  return (
    <>
      <Video activeVideo={activeVideo} player={player} />
    </>
  );
}

export default Player;
