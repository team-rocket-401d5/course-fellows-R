import io from 'socket.io-client';
let socket;
export const initiateSocket = () => {
  socket = io('http://localhost:4000');
  console.log(`Connecting socket...`);
  socket.emit('join');
  socket.on('get message', message => {
    console.log('message from socket', message);
  });
};
export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
};
// export const subscribeToChat = cb => {
//   if (!socket) return true;
//   socket.on('chat', msg => {
//     console.log('Websocket event received!');
//     return cb(null, msg);
//   });
// };
export const getMessage = message => {
  return socket.on('get message', message => {
    console.log('message from socket', message);
  });
};
export const sendMessage = message => {
  socket.emit('msg', message);
};
