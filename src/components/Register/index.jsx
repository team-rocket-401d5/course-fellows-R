import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import { If, Else, Then } from 'react-if';
import { Container, Image, Col, Row } from 'react-bootstrap';
import { RegisterContext } from '../../context/auth';
import signupImage from '../../assets/signup-t.png';
//

function Register() {
  let history = useHistory();
  let [wantSignup, setWantSignup] = useState(false);
  const { loggedIn } = useContext(RegisterContext);
  useEffect(() => {
    console.log('hi');
    if (loggedIn) history.push('/');
  }, [history, loggedIn]);
  return (
    <>
      <section className="register">
        <Container className="justify-content-md-center" fluid="sm" style={{ paddingTop: 39 }}>
          <Row>
            <Col md="8">
              <Image src={signupImage} className="img-fluid" rounded />
            </Col>
            <Col md="4">
              <If condition={wantSignup}>
                <Then>
                  <Login></Login>
                </Then>
                <Else>
                  <Signup></Signup>
                </Else>
              </If>

              <a
                style={{
                  width: '100%',
                  margin: '0 auto',
                  display: 'block',
                  textAlign: 'center',
                }}
                href="#1"
                onClick={() => {
                  setWantSignup(!wantSignup);
                }}
              >
                {wantSignup ? 'Dont have account? sign up now' : 'already a user?'}
              </a>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Register;
