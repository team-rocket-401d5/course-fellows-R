import React, { useState, useEffect } from 'react';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import cookie from 'react-cookies';
dotenv.config();
const LOGIN = process.env.LOGIN || `http://localhost:4000/signin`;
const SIGNUP = process.env.SIGNUP || `http://localhost:4000/signup`;
const SECRET = process.env.JWT_SECRET || 'mysecret';

const postUrl = 'http://localhost:4000/oauth';

export const RegisterContext = React.createContext();
function RegisterProvider(props) {
  const [loggedIn, setloggedIn] = useState(false);
  const [user, setuser] = useState({});
  const [token, setToken] = useState('');

  const validateToken = token => {
    console.log(token);
    try {
      const user = jwt.verify(token, SECRET);
      console.log(token, user);
      // const user = jwt.decode(token);
      console.log('hi', user);
      setLoginState(true, token, user);
    } catch (e) {
      console.log(`TOKEN validation ERROR ${e.message}`);
      setLoginState(false, null, {});
    }
  };
  const setLoginState = (loggedIn, token, user) => {
    cookie.save('auth', token);
    setToken(token);
    setuser(user);
    setloggedIn(loggedIn);
    setToken(token);
    console.log('hi', user);
  };
  const login = async (username, password) => {
    try {
      console.log(LOGIN);
      const response = await superagent
        .post(`${LOGIN}`)
        .set('authorization', `Basic ${btoa(`${username}:${password}`)}`);
      console.log('userrr', response.body);
      validateToken(response.body.token);
      console.log(response.body.token);
    } catch (e) {
      console.error(e.message);
    }
  };

  const signup = async (username, password) => {
    try {
      const response = await superagent.post(`${SIGNUP}`).send({ username, password });
      console.log(response.body);
      validateToken(response.body.token);
    } catch (e) {
      console.error(e.message);
    }
  };
  const oauth = async username => {
    const result = await superagent.post(postUrl).send(username);
    console.log(result.body);
    validateToken(result.body.token_value);
  };

  const logout = () => {
    setLoginState(false, null, {});
  };
  useEffect(() => {
    const token = cookie.load('auth');
    validateToken(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const state = {
    loggedIn,
    setloggedIn,
    user,
    setuser,
    login,
    logout,
    signup,
    oauth,
    token,
  };
  console.log('bbb', state);

  return <RegisterContext.Provider value={state}>{props.children}</RegisterContext.Provider>;
}
export default RegisterProvider;
