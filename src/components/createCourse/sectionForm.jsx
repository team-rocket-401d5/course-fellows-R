import React from 'react';
import { Form } from 'react-bootstrap';
function SectionForm({ sectionName, setSectionName }) {
  return (
    <Form className="create-course">
      <h2>Create New Section</h2>
      <Form.Group controlId="formBasicEmail">
        <Form.Control
          type="email"
          placeholder="section name"
          value={sectionName}
          onChange={e => {
            setSectionName(e.target.value);
          }}
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
    </Form>
  );
}

export default SectionForm;
