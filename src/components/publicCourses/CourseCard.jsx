import React, { useEffect, useState, useContext } from 'react';
import superagent from 'superagent';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { BsHeart, BsHeartFill, BsPlusSquare } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { If, Then, Else } from 'react-if';
import { RegisterContext } from '../../context/auth';
const putLikeURL = 'http://localhost:4000/public/like';
const addToCoursesUrl = 'http://localhost:4000/public/addtocourse';

function AddButton(props) {
  return (
    <Card.Link
      onClick={() => {
        props.handleAdd(props.courseId);
      }}
    >
      <BsPlusSquare />
      Add
    </Card.Link>

    // {/* <Card.Link>
    // <If condition={!isAdded}>
    //   <Then>
    //     <BsBookmarkPlus
    //       onClick={() => {
    //         props.handleAdd(props.courseId);
    //         setIsAdded(!isAdded);
    //       }}
    //     />
    //     Add
    //   </Then>
    //   <Else>
    //     <BsBookmarkFill />
    //   </Else>
    // </If>
    // </Card.Link> */}
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
      <Container>
        <Row>
          {props.courses.map((item) => (
            <Col key={item._id + item.publisher} xs={12} sm={6} lg={3}>
              <Card key={item._id + item.publisher}>
                <Card.Img
                  onClick={() => {
                    history.push(`/public/${item._id}`);
                  }}
                  variant="top"
                  src={item.playlist.thumbnail}
                />
                <Card.Body>
                  <Card.Title>{item.playlist.playlist_title}</Card.Title>
                  <Card.Text>
                    <b>From:</b> {item.publisher}
                  </Card.Text>
                </Card.Body>
                <If condition={context.loggedIn}>
                  <Then>
                    <Card.Body className="justify-content-between d-flex">
                      <Card.Link
                        onClick={() => {
                          handleLike(item._id);
                        }}
                      >
                        <If condition={item.likes.includes(context.user.username)}>

                          <Then>
                            <BsHeartFill />
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
                      <Card.Link >
                        <BsHeartFill/>
                        {item.likes.length}
                      </Card.Link>
                    </Card.Body>
                  </Else>
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
