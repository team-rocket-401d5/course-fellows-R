import React, { useContext, useState } from 'react';
import { RegisterContext } from '../../context/auth';
import { Button, Form, Navbar, FormControl } from 'react-bootstrap';
import { If, Else, Then } from 'react-if';

function Login(props) {
  const context = useContext(RegisterContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    context.login(username, password);
  };

  return (
    <If condition={context.loggedIn}>
      <Then>
        <Button id="btj" variant="dark" onClick={context.logout}>
          Logout
        </Button>
      </Then>
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
              Login
            </Button>
          </Form>
        </Navbar>
      </Else>
    </If>
  );
}

export default Login;
