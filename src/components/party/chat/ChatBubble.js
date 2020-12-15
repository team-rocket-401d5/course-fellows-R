import React from 'react';
import Toast from 'react-bootstrap/Toast';
import {If} from 'react-if';

function ChatBubble(props) {
  return (
    // change style and name to display name for google users
    <If condition={props.text.user !== ''}>
    <Toast key={`${props.text.msg}+${props.text.user}`}>
      <Toast.Body>{props.text.user}</Toast.Body>
      <Toast.Body>{props.text.msg}</Toast.Body>
    </Toast>

    </If>
  );
}

export default ChatBubble;
