import React, { useState, useEffect, useContext } from 'react';
import superagent from 'superagent';
import { RegisterContext } from '../../context/auth';
import { ListGroup, Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function VideoList(props) {
  const url = 'http://localhost:4000';
  let history = useHistory();

  const { user, token } = useContext(RegisterContext);
  const [course, setCourse] = useState({ sections: [], playlist: {} });

  useEffect(() => {
    console.log(user.username, props.courseId);
    if (props.publicid) {
      superagent
        .get(`${url}/public/${props.courseId}`)
        .set('authorization', `bearer ${token}`)
        .then(({ body }) => {
          setCourse(body);

          console.log('public', body);
        })
        .catch((e) => console.log(e));
    } else {
      superagent
        .get(`${url}/user/${props.user}/courses/${props.courseId}`)
        .set('authorization', `bearer ${token}`)
        .then(({ body }) => {
          console.log('paramss', body);
          setCourse(body);
        })
        .catch((e) => console.log(e));
    }
  }, [props.courseId, props.publicid, props.user, token, user.username]);

  
  return (
    <>
      <ListGroup>
        {course.sections.map((item) => {
          return (
            <>
              <ListGroup.Item id={item.section_title} key={item.section_title}>
                {item.section_title}
              </ListGroup.Item>
              {item.videos.map((item1) => {
                return (
                  <ListGroup.Item
                    key={item.video_id + item.section_title}
                    onClick={() => {
                      history.push(`/video/${course._id}/${item1.video_id}`);
                    }}
                  >
                    {item1.title}
                  </ListGroup.Item>
                );
              })}
            </>
          );
        })}
      </ListGroup>
    </>
  );
}

export default VideoList;
