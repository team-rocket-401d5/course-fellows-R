import React from 'react';
import { ListGroup, Card, ProgressBar, ListGroupItem, Button, Row, Col } from 'react-bootstrap';
import uniqId from 'uniqid';
import { If } from 'react-if';
import { Link } from 'react-router-dom';

function Section(props) {
  let now = Math.floor((props.course.time_watched / props.course.total_duration) * 100);

  console.log('prop', props.ispublic);
  // /:user/courses/:course'
  return (
    <>
      <Card style={{ width: '100%' }}>
        <Card.Img variant="top" src={`${props.course.playlist.thumbnail}`} />
        <Card.Body>
          <Card.Title>{props.course.playlist.playlist_title}</Card.Title>
          <If condition={!props.ispublic}>
            <Card.Text>
              <ProgressBar now={now} className="mb-2" />
              <Card.Text style={{ textAlign: 'center' }}> {now}% COMPLETE</Card.Text>
              <Card.Text>
                <Row className="equal-btn">
                  <Link
                    className="btn"
                    to={{
                      pathname: '/createCourse',
                      state: {
                        payload: props.course._id,
                        method: 'edit',
                      },
                    }}
                  >
                    Edit course
                  </Link>{' '}
                  <Link
                    to={{
                      pathname: `/party/${uniqId()}`,
                      state: { payload: props.course.sections },
                    }}
                  >
                    Create Room
                  </Link>{' '}
                </Row>
              </Card.Text>
            </Card.Text>
          </If>
        </Card.Body>

        <ListGroup className="list-group-flush">
          {props.course.sections.map(item => {
            // thumbnail
            return (
              <>
                <ListGroupItem>
                  {' '}
                  <Card.Link href={`#${item.section_title}`}>{item.section_title}</Card.Link>{' '}
                </ListGroupItem>
              </>
            );
          })}
        </ListGroup>
      </Card>
    </>
  );
}
export default Section;
