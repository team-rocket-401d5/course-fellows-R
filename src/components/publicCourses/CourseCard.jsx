import React, { useEffect, useState, useContext } from 'react';
import superagent from 'superagent';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { BsHeart, BsHeartFill, BsPlusSquare } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { If, Then, Else } from 'react-if';
import { RegisterContext } from '../../context/auth';
const putLikeURL = 'https://course-fellows.herokuapp.com/public/like';
const addToCoursesUrl = 'https://course-fellows.herokuapp.com/public/addtocourse';

function AddButton(props) {
  return (
    <Card.Link
      className="pointer d-flex align-items-center"
      onClick={() => {
        props.handleAdd(props.courseId);
      }}
    >
      <BsPlusSquare />
      Add
    </Card.Link>
  );
}

function CourseCard(props) {
  let history = useHistory();
  const context = useContext(RegisterContext);
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState([]);

  function handleLike(id) {
    superagent
      .patch(`${putLikeURL}/${id}`)
      .set('authorization', `bearer ${context.token}`)
      .send({ username: context.user.username })
      .then(({ body }) => {
        setLike(body.likes);
      });
    if (isLiked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }
  function handleAdd(id) {
    superagent
      .post(`${addToCoursesUrl}/${id}`)
      .set('authorization', `bearer ${context.token}`)
      .send({ username: context.user.username })
      .then(({ body }) => {
        history.push('/');
      });
  }

  useEffect(() => {
    props.update();
  }, [props, like]);

  return (
    <>
      <Row>
        {props.courses.map(item => (
          <Col key={item._id + item.publisher} xs={12} sm={6} lg={3} className="d-flex-sm">
            <Card key={item._id + item.publisher}>
              <Card.Img
                className="pointer d-flex align-items-center"
                onClick={() => {
                  history.push(`/public/${item._id}`);
                }}
                variant="top"
                src={item.playlist.thumbnail}
              />
              <Card.Body>
                <Card.Title>{item.playlist.playlist_title}</Card.Title>
                <Card.Text>
                  <b>From:</b> {item.publisher.replace(/(@gmail.com)/g, '')}
                </Card.Text>
              </Card.Body>
              <If condition={context.loggedIn}>
                <Then>
                  <Card.Body className="justify-content-end d-flex">
                    <Card.Link
                      className="pointer d-flex align-items-center"
                      onClick={() => {
                        handleLike(item._id);
                      }}
                    >
                      <If condition={item.likes.includes(context.user.username)}>
                        <Then>
                          <BsHeartFill className="clicked" />
                        </Then>
                        <Else>
                          <BsHeart />
                        </Else>
                      </If>
                      {item.likes.length}
                    </Card.Link>

                    <AddButton handleAdd={handleAdd} courseId={item._id} />
                  </Card.Body>
                </Then>
                <Else>
                  <Card.Body>
                    <Card.Link>
                      <BsHeartFill />
                      {item.likes.length}
                    </Card.Link>
                  </Card.Body>
                </Else>
              </If>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default CourseCard;
