import React, { useState, useContext } from 'react';
import { RegisterContext } from '../../context/auth';
import { If, Else, Then } from 'react-if';
import { Button, Form, Navbar, FormControl } from 'react-bootstrap';
import Oauth from './Oauth';

function Signup(props) {
  const context = useContext(RegisterContext);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = e => {
    if (e.target.name === 'username') {
      setusername(e.target.value);
    } else if (e.target.name === 'password') {
      setpassword(e.target.value);
    } else if (e.target.name === 'Confirm') {
      setConfirmPassword(e.target.value);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (password !== confirmPassword) alert('your passwords are not equal');
    else context.signup(username, password);
  };

  return (
    <If condition={context.loggedIn}>
      <Then />
      <Else>
        <Navbar bg="primary" variant="dark">
          <Form onSubmit={handleSubmit} inline>
            <FormControl
              type="text"
              name="username"
              placeholder="Enter Username"
              onChange={handleChange}
              className="mr-sm-2"
              value={username}
            />
            <FormControl
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              className="mr-sm-2"
              value={password}
            />
            <FormControl
              type="password"
              name="Confirm"
              placeholder="Confirm password"
              onChange={handleChange}
              className="mr-sm-2"
              value={confirmPassword}
            />
            <Button variant="outline-light" type="submit">
              signup
            </Button>
            <Oauth />
          </Form>
        </Navbar>
      </Else>
    </If>
  );
}

export default Signup;