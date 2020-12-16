import React from 'react';
import Toast from 'react-bootstrap/Toast';
import { If } from 'react-if';

function ChatBubble({ text }) {
  return (
    // change style and name to display name for google users
    <If condition={text.user !== ''}>
      {/* {item.publisher.replace(/(@gmail.com)/g, '/ /')} */}
      <Toast key={`${text.msg}+${text.user}`}>
        <Toast.Body>{text.user.replace(/(@gmail.com)/g, '')}:</Toast.Body>
        <Toast.Body>{text.msg}</Toast.Body>
      </Toast>
    </If>
  );
}

export default ChatBubble;
