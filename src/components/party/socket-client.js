import React, { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";
import Chat from './chat/chat.js';

const ENDPOINT = "http://localhost:4000/"; //server endpoint
const socket = socketIOClient(ENDPOINT);

function SocketClient(props) {
  const [messages, setMessages] = useState([]);
  const handleMsgSubmit = (sentMsg) => {//gets the message from the input form (send)
    let emitted = sentMsg;
    setMessages([...messages,sentMsg]); //TODO: push it to the message q
    socket.emit('chat message', emitted);
  }

  socket.on("Msg", msg => { //will trigger an event everytime the state updates (receive)
    //TODO: spread when message q added
    setMessages([...messages , msg.msg]);
  });

  return (
    <div>
      <Chat payload={messages} handleMsgSubmit={handleMsgSubmit} />
    </div>
  );
}

export default SocketClient;
