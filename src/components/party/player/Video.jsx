import React, { useState, useEffect } from 'react';

let player;
function Video({ activeVideo, player }) {
  console.log(activeVideo);
  //   const [player, setPlayer] = useState({});
  //   function buildPlayer() {
  //     setPlayer(new YTPlayer('#player').load(activeVideo));
  //     console.log(player);
  //   }
  function playerLoad() {
    player.load('GKSRyLdjsPA');
  }

  useEffect(() => {
    if (player) player.load(activeVideo);
  }, [activeVideo]);
  return <div id="player">{}</div>;
}

export default Video;
