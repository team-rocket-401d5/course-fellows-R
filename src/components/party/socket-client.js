import React, { useContext, useState } from 'react';
import Chat from './chat/chat.js';
import { SocketClientContext } from '../../context/socketClientContext.js'

function SocketClient(props) {
  const context = useContext(SocketClientContext);
  const [messages, setMessages] = useState([]);
  const { match: { params } } = props;
  const roomId= params.roomId;

  const handleMsgSubmit = (sentMsg) => {//gets the message from the input form (send)
    let emitted = sentMsg;
    setMessages([...messages,sentMsg]); //TODO: push it to the message q
    context.socket.emit('chat message', {emitted,roomId});
  }


  context.socket.on("Msg", msg => { //will trigger an event everytime the state updates (receive)
    //TODO: spread when message q added
    console.log(msg.roomId);
      setMessages([...messages , msg.msg]);
  });

  return (
    <div>
      <Chat payload={messages} handleMsgSubmit={handleMsgSubmit} />
    </div>
  );
}

export default SocketClient;
