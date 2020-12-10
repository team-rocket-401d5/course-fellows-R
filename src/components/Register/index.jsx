import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { If, Else, Then } from 'react-if';

function Register() {
  let [wantSignup, setWantSignup] = useState(false);
  return (
    <section Class="register">
      <If condition={wantSignup}>
        <Then>
          <Login></Login>
        </Then>
        <Else>
          <Signup></Signup>
        </Else>
      </If>
      <a
        href="#1"
        onClick={() => {
          setWantSignup(!wantSignup);
        }}
      >
        {wantSignup ? 'Dont have account? sign up now' : 'already a user?'}
      </a>
    </section>
  );
}

export default Register;
