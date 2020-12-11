import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { If, Else, Then } from 'react-if';
import { Container, Image, Col, Row } from 'react-bootstrap';
let image ='https://i.pinimg.com/originals/6b/e3/69/6be369b11b50e0b1c3a2fea19ba7e2ba.png';
function Register() {
  let [wantSignup, setWantSignup] = useState(false);
  return (
    <>
      <section className="register">
        <Container
          className="justify-content-md-center"
          fluid="sm"
          style={{ paddingTop: 39 }}
        >
          <Row>
            <Col md="6">
              <Image
                src="https://i.pinimg.com/564x/1b/61/21/1b61216ceaccc25f3c386dce23ea567e.jpg"
                className="img-fluid"
                rounded
              />
            </Col>
            <Col md="6">
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
                {wantSignup
                  ? 'Dont have account? sign up now'
                  : 'already a user?'}
              </a>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Register;
