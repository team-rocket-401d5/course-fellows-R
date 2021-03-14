import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CreateCourseForm(props) {
  const [url, setUrl] = useState('');
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create your course now
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="create-course">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              Enter a playlist url from youtube to create a new course
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="youtube.com/playlist?list=course-id"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
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

        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateCourseForm;
