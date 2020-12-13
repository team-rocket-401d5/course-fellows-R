import React from 'react';
import Toast from 'react-bootstrap/Toast';

function ChatBubble(props) {
  return (
    // change style and name to display name for google users
    <Toast key={props.text.msg}>
      <Toast.Body>{props.text.user}</Toast.Body>

      <Toast.Body>{props.text.msg}</Toast.Body>
    </Toast>
  );
}

export default ChatBubble;
