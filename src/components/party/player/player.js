import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Video from './Video';
import VideoList from './VideoList';

function Player({ videos, activeVideo, setActiveVideo, player }) {
  return (
    <>
      <Container fluid>
        <Row noGutters>
          <Col className="overflow-y height-100" xs={12} md={3}>
            <VideoList videos={videos} setActiveVideo={setActiveVideo} />
          </Col>
          <Col className="height-100" xs={12} md={6}>
            <Video activeVideo={activeVideo} player={player} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Player;
