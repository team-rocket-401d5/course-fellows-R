import React, { useEffect, useState, useContext } from 'react';
import superagent from 'superagent';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {
  BsHeart,
  BsHeartFill,
  BsBookmarkPlus,
  BsBookmarkFill,
} from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { If, Then, Else } from 'react-if';
import { RegisterContext } from '../../context/auth';
const putLikeURL = 'http://localhost:4000/public/like';
const addToCoursesUrl = 'http://localhost:4000/public/addtocourse';

function CourseCard(props) {
  let history = useHistory();
  const context = useContext(RegisterContext);

  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState([]);
  // const [added, setAdded] = useState([]);

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
        // history.push('/myCourses');
      });
  }

  useEffect(() => {
    props.update();
  }, [props, like]);

  return (
    <>
      <Container>

        <Row>
          {props.courses.map((item) => (

            <Col key={item._id + item.publisher} xs={12} sm={6} lg={3}>
              <Card key={item._id + item.publisher}>
                <Card.Img onClick={() => {

                  history.push(`/public/${item._id}`);

                }}
                  variant="top" src={item.playlist.thumbnail} />
                <Card.Body>
                  <Card.Title>{item.playlist.playlist_title}</Card.Title>
                  <Card.Text><b>From:</b> {item.publisher}</Card.Text>
                </Card.Body>
                <If condition={context.loggedIn}>
                  <Then>
                    <Card.Body className="justify-content-between d-flex">
                      <Card.Link
                        onClick={() => {
                          console.log('i', item)
                          handleLike(item._id);
                        }}
                      >
                        <If
                          condition={item.likes.includes(context.user.username)}
                        >
                          <Then>
                            <BsHeartFill />
                          </Then>
                          <Else>
                            <BsHeart />
                          </Else>
                        </If>
                        {item.likes.length}
                      </Card.Link>
                      <Card.Link

                        onClick={() => {
                          handleAdd(item._id);
                        }}
                      >
                        <If condition={true}>
                          <Then>
                            <BsBookmarkPlus />
                          Add
                        </Then>
                          <Else>
                            <BsBookmarkFill />
                          </Else>
                        </If>
                      </Card.Link>
                    </Card.Body>
                  </Then>
                </If>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

    </>
  );
}

export default CourseCard;
