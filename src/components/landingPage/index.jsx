import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import landingImage from '../../assets/landing-t.png';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <section className="landing">
      <Container>
        <Row>
          <Col md={{ span: 6, order: 1 }} className="landing-bg">
            <img src={landingImage} alt="landing page" className="img-fluid" />
          </Col>
          <Col md={{ span: 6, order: 2 }} className="flex-center pb-3">
            <h2>Grow your Knowledge, Keep it organized</h2>
            <p>
            With Course Fellows, you can organize and optimize your online learning experience, 
            Share your it with other online learners, 
            and stay focused instead of wandering through sites full of distractions. 
            </p>
            <Link to="/register" className="btn">
              Join now
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Landing;
