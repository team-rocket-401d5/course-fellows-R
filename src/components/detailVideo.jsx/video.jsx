import React, { useState, useContext } from 'react';
import superagent from 'superagent';
import { RegisterContext } from '../../context/auth';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import Iframe from 'react-iframe';
import { If, Then, Else } from 'react-if';

function Video(props) {
  let str = props.video.url_simple ? props.video.url_simple : ' ';
  let res = str.replace(/(\/watch\?v=)/g, '/embed/');
  console.log(res, str, 'res', props.video);
  const [noteActive, setNoteActive] = useState(false);
  const [note, setNote] = useState('');

  const { user, token } = useContext(RegisterContext);

  const updateNote = (note, user1) => {
    const url = 'http://localhost:4000';
    //:user/courses/:course/:vidID/notes
    superagent
      .patch(
        `${url}/user/${user1}/courses/${props.courseId}/${props.videoId}/notes`
      )
      .set('authorization', `bearer ${token}`)
      .send({ note: note, user: user1 })
      .then(({ body }) => {
        console.log('notebody', body);
      })
      .catch((e) => console.log('errroerere', e.message));
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setNote(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setNoteActive(false);
    updateNote(e.target.note.value, user.username);
  };

  return (
    <>
      <h2>{props.video.title}</h2>
      <Iframe
        url={`${res}`}
        width="450px"
        height="450px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
      />
      <If condition={!noteActive}>
        <Then>
          <p>{note}</p>
          <Button
            onClick={() => {
              setNoteActive(true);
            }}
          >
            Edit notes
          </Button>
        </Then>
        <Else>
          <Form onSubmit={handleSubmit}>
            <textarea name="note" value={note} onChange={handleChange} />
            <Button type="submit" value="Submit">
              Save
            </Button>
          </Form>
        </Else>
      </If>
    </>
  );
}

export default Video;