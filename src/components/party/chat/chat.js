import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BsXOctagon } from 'react-icons/bs';
import ChatBubble from './ChatBubble.js';

function Chat({ chat, payload, handleMsgSubmit, toggleChat }) {
  // let msg = ''
  const [input, setInput] = useState('');

  const handleMsgChange = e => {
    setInput(e.target.value);
  };
  const handleFormSumbit = e => {
    e.preventDefault();
    if (input.trim() !== '') {
      handleMsgSubmit(input);
    }
    setInput('');
  };

  return (
    <div className="chat d-none" ref={chat}>
      <div className="chat-header d-flex">
        <p>Chat</p>
        <BsXOctagon className="pointer" onClick={toggleChat} />
      </div>
      <div className="chat-body overflow-y">
        {payload.map(item => (
          <ChatBubble text={item} />
        ))}
      </div>
      <Form onSubmit={handleFormSumbit}>
        <Form.Control
          type="text"
          placeholder="Send a message"
          onChange={handleMsgChange}
          value={input}
        />
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </div>
  );
}

export default Chat;
