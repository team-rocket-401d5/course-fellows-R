import React, { useState, useEffect, useContext } from 'react';
import superagent from 'superagent';
import { RegisterContext } from '../../context/auth';
import { Container, Row, Col } from 'react-bootstrap';
import Video from './video';
import VideoList from './videolist';

function Detailvideo(props) {
  const url = 'https://course-fellows.herokuapp.com';
  const [video, setVideo] = useState({});

  const {
    match: { params },
  } = props;
  const { courseId, id } = params;
  const { user, token } = useContext(RegisterContext);
  // const [note, setNote] = useState('');

  useEffect(() => {
    ///:user/courses/:course/:vidID
    if (id) {
      superagent
        .get(`${url}/user/${user.username}/courses/${courseId}/${id}`)
        .set('authorization', `bearer ${token}`)
        .then(({ body }) => {
          setVideo(body);
          // setNote(body.note)
        })
        .catch(e => console.log(e));
    }
  }, [courseId, id, token, user.username]);

  return (
    <>
      <section class="detail-video height-100">
        <Row noGutters>
          <Col className="overflow-y height-md-100 mt-3 " xs={12} md={3}>
            <VideoList video={video} courseId={courseId} videoId={id} user={user.username} />
          </Col>
          <Col className="height-100 px-2 p-3" xs={12} md={9}>
            <Video video={video} courseId={courseId} videoId={id} />
          </Col>
        </Row>
      </section>
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
