import React, {  useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import ChatBubble from './ChatBubble.js';

function Chat(props) {
  // let msg = ''
  console.log("payload",props.payload);
  const [input,setInput] = useState('')
  const handleMsgChange = (e) => {
    setInput(e.target.value);
  }
  const handleFormSumbit = (e) => {
    e.preventDefault();
    if ((input !== '') && (input !== ' ')) {
      props.handleMsgSubmit(input);
    }
    setInput('');
  }
  
  return (
    <>
      {props.payload.map((item)=><ChatBubble text={item} />
      )}
      <Form onSubmit={handleFormSumbit}>
        <Form.Control type="text" placeholder="Send a message" onChange={handleMsgChange} value={input}/>
        <Button variant="primary" type="submit">Send</Button>
      </Form>
    </>
  );
}

export default Chat;

