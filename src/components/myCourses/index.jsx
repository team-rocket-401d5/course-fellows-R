import React, { useEffect, useState, useContext } from 'react';
import superagent from 'superagent';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { RegisterContext } from '../../context/auth';
import UserCard from './UserCard';
import CreateCourseForm from '../createCourseForm';

function MyCourses() {
  let url = `https://course-fellows.herokuapp.com`;
  const { user, token } = useContext(RegisterContext);
  // user/:user/courses to get all courses for one user
  let [courses, setCourses] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  function getCourses() {
    superagent
      .get(`${url}/user/${user.username}/courses`)
      .set('authorization', `bearer ${token}`)
      .then(({ body }) => setCourses(body))
      .catch(e => console.log(e));
  }
  useEffect(() => {
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token, url]);

  function addToPublic(courseId) {
    // /:user/courses/:course
    superagent
      .post(`${url}/user/${user.username}/courses/${courseId}`)
      .set('authorization', `bearer ${token}`)
      .catch(e => console.log(e.message));
  }

  function deleteCourse(courseId) {
    // /:user/courses/:course
    superagent
      .delete(`${url}/user/${user.username}/courses/${courseId}`)
      .set('authorization', `bearer ${token}`)
      .catch(e => console.log(e.message));

    getCourses();
  }

  return (
    <section className="my-courses">
      <Container>
        <CreateCourseForm show={modalShow} onHide={() => setModalShow(false)} />
        <Container>
          <Row className="justify-content-between pb-4">
            <h2 className="title">My Courses</h2>
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Add a new Course
            </Button>
          </Row>
        </Container>

        <article>
          <Row>
            {courses.map(item => (
              <Col xs={12} sm={6} lg={3} key={item._id}>
                <UserCard course={item} addToPublic={addToPublic} deleteCourse={deleteCourse} />
              </Col>
            ))}
          </Row>
        </article>
      </Container>
    </section>
  );
}

export default MyCourses;
