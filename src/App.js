
import { Route, Switch } from 'react-router-dom';
import SocketClient from './components/party/socket-client';
import JoinRoom from './components/party/room/joinRoom.js';
import SocketClientProvider from './context/socketClientContext.js';
import Register from './components/Register';
import RegisterProvider from './context/auth';
import Auth from '../src/context/outhprevent';

function App() {
  return (
    <div className="App">
      <RegisterProvider>
        <SocketClientProvider>
          <Register />
          <Auth />
          <Switch>
            <Route exact path='/' component={JoinRoom} />
            <Route path='/party/:roomId' component={SocketClient} />
          </Switch>
        </SocketClientProvider>
      </RegisterProvider>
    </div>
  );

}

export default App;
