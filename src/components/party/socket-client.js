import React, { useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import Chat from './chat/chat.js';
import { SocketClientContext } from '../../context/socketClientContext.js';
import Player from './player/player.js';
// import { initiateSocket, disconnectSocket, sendMessage } from '../../socket/socket';
import YTPlayer from 'yt-player';
let socket;
let player;

function SocketClient(props) {
  const sendMessage = message => {
    socket.emit('msg', message);
  };
  function playerInit() {
    player = new YTPlayer('#player', {
      related: false,
      modestBranding: true,
    });

    player.on('playing', () => {
      console.log('played');
      socket.emit('play');
    });
    player.on('paused', () => {
      console.log('paused', player.getCurrentTime());
      socket.emit('pause', player.getCurrentTime());
    });
  }
  const [messages, setMessages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState('');
  const initiateSocket = () => {
    socket = io('http://localhost:4000');
    console.log(`Connecting socket...`);
    socket.emit('join');
    if (props.location.state) {
      const videos = props.location.state.payload.reduce((acc, section) => {
        return [...acc, ...section.videos];
      }, []);
      // console.log(videos);
      socket.emit('set videos', videos);
    }
    socket.on('get message', message => {
      console.log('message from socket', message);
      console.log('message from socket', messages);
      setMessages(prev => {
        console.log(prev);
        return [...prev, message];
      });
    });
    socket.emit('get videos');
    socket.on('client videos', v => {
      console.log(v);
      console.log('videos from socket', v);
      setVideos(v);
      setActiveVideo(v[0].video_id);
    });
    // enter
    socket.emit('enter');
    // reset active video
    socket.on('reset active video', v => {
      console.log('videos from socket', v);
      setActiveVideo(v);
    });
    socket.on('update active video', newActive => {
      setActiveVideo(newActive);
    });
    socket.on('play', () => {
      player.play();
    });
    socket.on('pause', time => {
      player.seek(time);
      player.pause();
    });
  };

  const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) socket.disconnect();
  };

  const getMessage = message => {
    return socket.on('get message', message => {
      console.log('message from socket', message);
    });
  };
  function updateActiveVideo(video) {
    console.log(video);
    socket.emit('update active video', video);
    setActiveVideo(video);
  }
  const {
    match: { params },
  } = props;
  const roomId = params.roomId;
  function handleMsgSubmit(msg) {
    sendMessage(msg);
  }
  useEffect(() => {
    playerInit();
    initiateSocket();
    // initiateSocket();
    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <div>
      {/* <Chat payload={messages} handleMsgSubmit={handleMsgSubmit} />{' '} */}
      <Player
        videos={videos}
        activeVideo={activeVideo}
        setActiveVideo={updateActiveVideo}
        player={player}
      />
    </div>
  );
}

export default SocketClient;
