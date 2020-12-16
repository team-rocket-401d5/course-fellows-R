import React, { useContext, useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Chat from './chat/chat.js';
import ChatToggle from './chat/ChatToggle';
import { RegisterContext } from '../../context/auth';
import Player from './player/player.js';
import YTPlayer from 'yt-player';
import superagent from 'superagent';
import VideoList from './player/VideoList';
import { Row, Col } from 'react-bootstrap';

let backendURL = 'https://course-fellows.herokuapp.com';
let socket;
let player;
function SocketClient(props) {
  const registerContext = useContext(RegisterContext);
  const [messages, setMessages] = useState([]);
  const {
    match: { params },
  } = props;
  const controlChat = useRef();
  const chat = useRef();
  console.log('ana id', params);
  const initObj = { room_id: params.roomId, messages: [{ msg: '', user: '' }] };
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
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState('');
  const initiateSocket = () => {
    socket = io(`${backendURL}`);
    console.log(`Connecting socket...`);
    socket.emit('roomId init', params.roomId);
    socket.emit('join');
    postRoom(initObj);
    getMsgs(params.roomId);

    if (props.location.state) {
      const videos = props.location.state.payload.reduce((acc, section) => {
        return [...acc, ...section.videos];
      }, []);
      socket.emit('set videos', videos);
    }
    socket.on('get message', message => {
      setMessages(prev => {
        return [...prev, message.message];
      });
    });

    socket.emit('get videos');
    socket.on('client videos', v => {
      setVideos(v);
      setActiveVideo(v[0].video_id);
    });
    // enter
    socket.emit('enter');
    // reset active video
    socket.on('reset active video', v => {
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

  function updateActiveVideo(video) {
    console.log(video);
    socket.emit('update active video', video);
    setActiveVideo(video);
  }

  function handleMsgSubmit(message) {
    let emitted = { msg: message, user: registerContext.user.username };
    console.log('from send message', emitted);
    socket.emit('msg', emitted);

    putMsgs({ room_id: params.roomId, messages: emitted });
  }
  function getMsgs(roomId) {
    superagent.get(`https://course-fellows.herokuapp.com/messages/${roomId}`).then(({ body }) => {
      if (body) {
        setMessages(body.messages);
        // console.log(body, messages);
        // context.socket.emit('chat message', { emitted, roomId });
      }
    });
  }
  function postRoom(msgs) {
    superagent
      .post(`${backendURL}/messages`)
      .send(msgs)
      .then(({ body }) => console.log('post body', body));
  }
  function putMsgs(msgs) {
    console.log('putMsgs sent', msgs);
    superagent
      .put(`${backendURL}/messages`)
      .send(msgs)
      .then(({ body }) => {
        console.log('put body', body);
      });
  }
  function toggleChat() {
    // console.log(chat, controlChat);
    console.log(chat.current.classList.toggle('d-none'));
    console.log(controlChat.current.classList.toggle('d-none'));
  }

  useEffect(() => {
    playerInit();
    initiateSocket();

    return () => {
      disconnectSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Row noGutters>
        <Col
          className="overflow-y height-100"
          xs={{ span: 12, order: 2 }}
          md={{ span: 3, order: 0 }}
        >
          <VideoList videos={videos} setActiveVideo={updateActiveVideo} />
        </Col>
        <Col
          xs={{ span: 12, order: 0 }}
          md={{ span: 9, order: 0 }}
          className="d-flex justify-content-center"
        >
          <Player
            videos={videos}
            activeVideo={activeVideo}
            setActiveVideo={updateActiveVideo}
            player={player}
          />
          <Chat
            payload={messages}
            handleMsgSubmit={handleMsgSubmit}
            chat={chat}
            toggleChat={toggleChat}
          />
          <ChatToggle controlChat={controlChat} toggleChat={toggleChat} />
        </Col>
      </Row>
    </div>
  );
}

export default SocketClient;
