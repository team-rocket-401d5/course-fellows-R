import React ,{useContext}from 'react';
import { Form , Button } from 'react-bootstrap';
import uniqId from 'uniqid';
import { useHistory } from "react-router-dom";
import { SocketClientContext } from '../../context/socketClientContext.js'

let roomId='';
function JoinRoom(props) {
  const context = useContext(SocketClientContext);
  let action='';
  let history = useHistory();

  // if this doesn't happen the room will not be created in the server side
  // the user would have to actually click the button 
  const handleChange = (e)=>{roomId=e.target.value}
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(action === 'createParty'){
      roomId=uniqId();
      context.socket.emit('joinRoom',roomId);
      history.push(`/party/${roomId}`);//redirects to a new party route (client)

    }else if(action === 'join'){
      context.socket.emit('joinRoom',roomId);
      history.push(`/party/${roomId}`);//redirects to a existing party route (client)
    }

  }
  return (
    <>
    
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Join a Room</Form.Label>
          <Form.Control onChange={handleChange} id='roomId'/>
          <Button type="submit" onClick={()=>{action='join'}}>Join Room</Button>
        </Form.Group>

        <Button type="submit" onClick={()=>{action='createParty'}}>create a room</Button>
      </Form>
    </>
  );
}

export default JoinRoom;