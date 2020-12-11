import React, { useEffect, useState, useContext } from 'react';
import superagent from 'superagent';
import { Button, Form, Navbar, Container, Col, Row } from 'react-bootstrap';
import { RegisterContext } from '../../context/auth';
import UserCard from './UserCard';
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
    const { body } = await superagent
      .post(`${url}/user/${user.username}/courses/${courseId}`)
      .set('authorization', `bearer ${token}`);

    console.log(body);
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
        <Form className="create-course">
          <h2>Create your course now</h2>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Enter a playlist url from youtube to create a new course</Form.Label>
            <Form.Control type="email" placeholder="youtube.com/playlist?list=course-id" />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Button>Create</Button>
        </Form>
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
