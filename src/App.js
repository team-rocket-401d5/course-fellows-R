import './App.css';
import { Route, Switch } from 'react-router-dom';
import SocketClient from './components/party/socket-client';
import JoinRoom from './components/party/room/joinRoom.js';
import SocketClientProvider from './components/context/socketClientContext.js';

function App() {
  return (
    <div className="App">
      <SocketClientProvider>
        <Switch>
          <Route exact path='/' component={JoinRoom} />
          <Route path='/party/:roomId' component={SocketClient} />
        </Switch>
      </SocketClientProvider>
      {/* <JoinRoom/> */}
    </div>
  );
}

export default App;
