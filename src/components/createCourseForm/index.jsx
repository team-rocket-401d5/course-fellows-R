import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function CreateCourseForm() {
  const [url, setUrl] = useState('');
  return (
    <Form className="create-course">
      <h2>Create your course now</h2>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Enter a playlist url from youtube to create a new course</Form.Label>
        <Form.Control
          type="email"
          placeholder="youtube.com/playlist?list=course-id"
          value={url}
          onChange={e => {
            console.log(e.target.value);
            setUrl(e.target.value);
          }}
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
      <Link
        className="btn"
        to={{
          pathname: '/createCourse',
          state: {
            payload: url,
            method: 'create',
          },
        }}
      >
        Create
      </Link>
    </Form>
  );
}

export default CreateCourseForm;
