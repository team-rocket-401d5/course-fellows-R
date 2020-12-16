import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import superagent from 'superagent';
import CourseCard from './CourseCard';

const getCourseURL = 'https://course-fellows.herokuapp.com/public/';

function PublicCourses(props) {
  const [courses, setCourses] = useState([]);
  function getCourse() {
    superagent.get(getCourseURL).then(results => {
      setCourses(results.body);
    });
  }

  useEffect(() => {
    getCourse();
  }, []);
  return (
    <section className="public-courses">
      <Container>
        <h2>Public Courses</h2>
        <CourseCard courses={courses} update={getCourse} />
      </Container>
    </section>
  );
}

export default PublicCourses;
