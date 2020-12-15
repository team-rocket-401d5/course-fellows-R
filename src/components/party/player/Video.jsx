import React, { useEffect } from 'react';


function Video({ activeVideo, player }) {
  console.log(activeVideo);
  //   const [player, setPlayer] = useState({});
  //   function buildPlayer() {
  //     setPlayer(new YTPlayer('#player').load(activeVideo));
  //     console.log(player);
  //   }

  useEffect(() => {
    if (player) player.load(activeVideo);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeVideo]);
  return <div id="player">{}</div>;
}

export default Video;
