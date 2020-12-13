import React from 'react';
import Toast from 'react-bootstrap/Toast';

function ChatBubble(props) {
  
  return (
    <Toast key={props.text}>
      <Toast.Body>{props.text}</Toast.Body>
    </Toast>
  );
}

export default ChatBubble;