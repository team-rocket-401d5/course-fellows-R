import './App.css';
// import { Route, Switch } from 'react-router-dom';
import SocketClient from './components/party/socket-client';

function App() {
  return (
    <div className="App">
      {/* <Switch>
        <Route path={`/${roomId}`}> */}
          <SocketClient/>
        {/* </Route>
      </Switch> */}
    </div>
  );
}

export default App;
