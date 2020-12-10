import React, { useState, useContext } from 'react';
import { RegisterContext } from '../../context/auth';
import { If, Else, Then } from 'react-if';
import { Button, Form, Navbar, FormControl } from 'react-bootstrap';
import Oauth from './Oauth';

function Signup(props) {
  const context = useContext(RegisterContext);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const handleChange = e => {
    if (e.target.name === 'username') {
      setusername(e.target.value);
    } else if (e.target.name === 'password') {
      setpassword(e.target.value);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    context.signup(username, password);
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
            />
            <FormControl
              type="text"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              className="mr-sm-2"
            />
            <Button variant="outline-light" type="submit">
              signup
            </Button>
            <Oauth></Oauth>
          </Form>
        </Navbar>
      </Else>
    </If>
  );
}

export default Signup;
