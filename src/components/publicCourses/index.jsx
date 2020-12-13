import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import CourseCard from './CourseCard';
const getCourseURL = 'http://localhost:4000/public/';

function PublicCourses(props) {
  const [courses, setCourses] = useState([]);
  function getCourse() {
    console.log('hi');
    superagent.get(getCourseURL).then(results => {
      setCourses(results.body);
    });
  }

  useEffect(() => {
    getCourse();
  }, []);
  return (
    <div>
      <CourseCard courses={courses} update={getCourse} />
    </div>
  );
}

export default PublicCourses;
