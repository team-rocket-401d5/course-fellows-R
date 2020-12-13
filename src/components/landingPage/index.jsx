import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import landingImage from '../../assets/landing2.png';

function Landing() {
  return (
    <section className="landing">
      <Container>
        <Row>
          <Col md={{ span: 6, order: 1 }}>
            <img src={landingImage} alt="landing page" className="img-fluid" />
          </Col>
          <Col md={{ span: 6, order: 2 }} className="flex-center pb-3">
            <h2>This is heading to describe the website</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum harum laudantium
              porro praesentium maxime voluptatem aspernatur non enim ab minus. Quae dignissimos
              atque sit corporis commodi nemo quidem eum expedita! Id, totam ducimus possimus dolore
            </p>
            <a href="#1" className="btn">
              Join now
            </a>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Landing;
