import React, { useContext, useState } from 'react';
import Chat from './chat/chat.js';
import { SocketClientContext } from '../../context/socketClientContext.js'
import { RegisterContext } from '../../context/auth';

function SocketClient(props) {
  const context = useContext(SocketClientContext);
  const registerContext = useContext(RegisterContext);

  const [messages, setMessages] = useState([]);
  const { match: { params } } = props;
  const roomId= params.roomId;
// use backend routes to populate with new state
//{room_id , messages:[{msg,user},{}]} <= body 
  const handleMsgSubmit = (sentMsg) => {//gets the message from the input form (send)
    let emitted = {msg:sentMsg,user:registerContext.user.username};
    setMessages([...messages,emitted]); //TODO: push it to the message q
    context.socket.emit('chat message', {emitted,roomId});
  }


  context.socket.on("Msg", payload => { //will trigger an event everytime the state updates (receive)
    //TODO: spread when message q added
    console.log(payload);
      setMessages([...messages , payload.emitted]);
  });

  return (
    <div>
      <Chat payload={messages} handleMsgSubmit={handleMsgSubmit} />
    </div>
  );
}

export default SocketClient;
