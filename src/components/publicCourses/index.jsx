import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import CourseCard from './CourseCard';

const getCourseURL = 'https://course-fellows.herokuapp.com/public/';

function PublicCourses(props) {
  const [courses, setCourses] = useState([]);
  function getCourse() {

    superagent.get(getCourseURL).then((results) => {
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
