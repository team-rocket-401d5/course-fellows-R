import { Route, Switch } from 'react-router-dom';
import SocketClient from './components/party/socket-client';
import JoinRoom from './components/party/room/joinRoom.js';
import SocketClientProvider from './context/socketClientContext.js';
import Register from './components/Register';
import RegisterProvider from './context/auth';
import Auth from './context/outhprevent';
import Landing from './components/landingPage';
import Nav from './components/nav';

function App() {
  return (
    <div className="App">
      <RegisterProvider>
        <SocketClientProvider>
          <Auth />
          <Nav />
          <Register />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/register" component={Register} />
            <Route path='/party' component={JoinRoom} />
            <Route path='/party/:roomId' component={SocketClient} />
          </Switch>
        </SocketClientProvider>
      </RegisterProvider>
    </div>
  );


}

export default App;
