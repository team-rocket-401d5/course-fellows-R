import { Router, Route, Switch } from 'react-router';
import Register from './components/Register';
import RegisterProvider from './context/auth';
import Auth from './context/outhprevent';
import Landing from './components/landingPage';
import Nav from './components/nav';

function App() {
  return (
    <RegisterProvider>
      {/* <Auth />
			<Register /> */}
      <Nav />
      {/* 
      <Landing /> */}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/register" component={Register} />
      </Switch>
    </RegisterProvider>
  );
}

export default App;
