import React from 'react';

function ChatToggle({ controlChat, toggleChat }) {
  return (
    <div
      className="position-fixed main-color chat-toggle main-white pointer"
      ref={controlChat}
      onClick={toggleChat}
    >
      Chat
    </div>
  );
}

export default ChatToggle;
