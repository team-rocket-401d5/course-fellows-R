import React, { useState, useEffect, useContext } from 'react';
import superagent from 'superagent';
import { RegisterContext } from '../../context/auth';
import { Container, Row, Col } from 'react-bootstrap';
import Video from './video';
import VideoList from './videolist';

function Detailvideo(props) {
  const url = 'http://localhost:4000';
  const [video, setVideo] = useState({});

  const {
    match: { params },
  } = props;
  const { courseId, id } = params;
  const { user, token } = useContext(RegisterContext);

  useEffect(() => {
    ///:user/courses/:course/:vidID
    if (id) {
      superagent
        .get(`${url}/user/${user.username}/courses/${courseId}/${id}`)
        .set('authorization', `bearer ${token}`)
        .then(({ body }) => {
          setVideo(body);
        })
        .catch((e) => console.log(e));
    }
  }, [courseId, id, token, user.username]);

  return (
    <>
      <Container fluid>
        <Row noGutters>
          <Col className="height-100" xs={12} md={3}>
            <VideoList
              video={video}
              courseId={courseId}
              videoId={id}
              user={user.username}
            />
          </Col>
          <Col xs={12} md={6}>
            <Video video={video} courseId={courseId} videoId={id} />
          </Col>
        </Row>
      </Container>
    </>

    // <Container fluid >
    //     <Row noGutters >
    //         <Col className=' overflow-y height-100' xs={12} md={3}><Section course={course} ispublic={ispublic} /></Col>
    //         <Col className="overflow-y height-100" xs={12} md={9}> <VideoList course={course} ispublic={ispublic} /></Col>
    //     </Row>

    // </Container>
  );
}

export default Detailvideo;
