import React, { useState, useEffect, useContext } from 'react';
import superagent from 'superagent';
import { RegisterContext } from '../../context/auth';
import { Row, Col } from 'react-bootstrap';
import VideoList from './videolist';
import Section from './Section';

function DetailCourse(props) {
  const [course, setCourse] = useState({ sections: [], playlist: {} });
  const [ispublic, setIspublic] = useState(false);

  const {
    match: { params },
  } = props;
  const { user, token } = useContext(RegisterContext);

  let url = `https://course-fellows.herokuapp.com`;

  useEffect(() => {
    if (params.id) {
      superagent
        .get(`${url}/user/${user.username}/courses/${params.id}`)
        .set('authorization', `bearer ${token}`)
        .then(({ body }) => {
          setCourse(body);
        })
        .catch(e => console.log(e));
    } else if (params.publicid) {
      superagent
        .get(`${url}/public/${params.publicid}`)
        .set('authorization', `bearer ${token}`)
        .then(({ body }) => {
          setCourse(body);
          setIspublic(true);
          console.log('public', body);
        })
        .catch(e => console.log(e));
    }
  }, [params.id, params.publicid, token, url, user.username]);
  console.log('c', course);
  // /:user/courses/:course'

  return (
    <section className="course-details">
      <Row noGutters>
        <Col className=" overflow-y height-md-100" xs={12} md={3}>
          <Section course={course} ispublic={ispublic} />
        </Col>
        <Col className="overflow-y height-100" xs={12} md={9}>
          {' '}
          <VideoList course={course} ispublic={ispublic} />
        </Col>
      </Row>
    </section>
  );
}

export default DetailCourse;
