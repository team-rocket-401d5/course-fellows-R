import React, { useEffect, useState, useContext } from 'react';
import superagent from 'superagent';
import { Container, Col, Row } from 'react-bootstrap';
import { RegisterContext } from '../../context/auth';
import UserCard from './UserCard';
import CreateCourseForm from '../createCourseForm';
function MyCourses() {
  let url = `http://localhost:4000`;
  const { user, token } = useContext(RegisterContext);
  // user/:user/courses to get all courses for one user
  let [courses, setCourses] = useState([]);
  function getCourses() {
    superagent
      .get(`${url}/user/${user.username}/courses`)
      .set('authorization', `bearer ${token}`)
      .then(({ body }) => setCourses(body))
      .catch(e => console.log(e));
  }
  useEffect(() => {
    console.log(user.username);
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token, url]);

  async function addToPublic(courseId) {
    // /:user/courses/:course
    await superagent
      .post(`${url}/user/${user.username}/courses/${courseId}`)
      .set('authorization', `bearer ${token}`);
  }

  async function deleteCourse(courseId) {
    // /:user/courses/:course
    const { body } = await superagent
      .delete(`${url}/user/${user.username}/courses/${courseId}`)
      .set('authorization', `bearer ${token}`);
    getCourses();

    console.log(body);
  }

  return (
    <section className="my-courses">
      <Container>
        <CreateCourseForm />
        <h2 className="title">My Courses</h2>
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
