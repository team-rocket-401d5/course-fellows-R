import React, { useState, useContext, useEffect } from 'react';
import superagent from 'superagent';
import { RegisterContext } from '../../context/auth';
import { Form, Button } from 'react-bootstrap';
import Iframe from 'react-iframe';
import { If, Then, Else } from 'react-if';

function Video(props) {
  let str = props.video.url_simple ? props.video.url_simple : ' ';
  let res = str.replace(/(\/watch\?v=)/g, '/embed/');
  const [noteActive, setNoteActive] = useState(false);
  const [note, setNote] = useState('');

  const { user, token } = useContext(RegisterContext);

  const updateNote = (note, user1) => {
    let url = 'http://localhost:4000';
    //:user/courses/:course/:vidID/notes
    superagent
      .patch(
        `${url}/user/${user1}/courses/${props.courseId}/${props.videoId}/notes`
      )
      .set('authorization', `bearer ${token}`)
      .send({ note: note, user: user1 })
      .then(({ body }) => {
        get();
      })
      .catch((e) => console.log('errroerere', e.message));
  };
  function get() {
    superagent
      .get(
        ` http://localhost:4000/user/${user.username}/courses/${props.courseId}/${props.videoId}`
      )
      .set('authorization', `bearer ${token}`)
      .then(({ body }) => {
        setNote(body.note);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    ///:user/courses/:course/:vidID
    get();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user.username, props.videoId]);

  const handleChange = (e) => {
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
        // width="450px"
        // height="450px"
        id="myId"
        className="width-75 height-50"
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
