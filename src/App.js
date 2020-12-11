import React, { useContext } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import RegisterProvider from './context/auth';
import Auth from './context/outhprevent';
import Landing from './components/landingPage';

import MyCourses from './components/myCourses';
import Nav from './components/nav';
import { RegisterContext } from './context/auth';
import Home from './components/Home';

function App() {
  const context = useContext(RegisterContext);
  return (
    <RegisterProvider>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
      </Switch>
    </RegisterProvider>
  );
}

export default App;
