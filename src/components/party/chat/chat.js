import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import ChatBubble from './ChatBubble.js';

function chat(props) {
  let msg = ''
  const handleMsgChange = (e) => {
    msg = e.target.value;
  }
  const handleFormSumbit = (e) => {
    e.preventDefault();
    if ((msg !== '') && (msg !== ' ')) {
      props.handleMsgSubmit(msg);
    }
    e.target.value = '';
  }
  
  return (
    <>
      {props.payload.map((item)=><ChatBubble text={item} />
      )}
      <Form onSubmit={handleFormSumbit}>
        <Form.Control type="text" placeholder="Send a message" onChange={handleMsgChange} />
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </>
  );
}

export default chat;

