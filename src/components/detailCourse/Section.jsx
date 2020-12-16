import React from 'react';
import { ListGroup, Card, ProgressBar, ListGroupItem, Row } from 'react-bootstrap';
import uniqId from 'uniqid';
import { If } from 'react-if';
import { Link } from 'react-router-dom';

function Section(props) {
  let now = Math.floor((props.course.time_watched / props.course.total_duration) * 100);

  console.log('prop', props.ispublic);
  // /:user/courses/:course'
  return (
    <>
      <Card style={{ width: '100%' }} className="mt-3 course-details-section">
        <Card.Img variant="top" src={`${props.course.playlist.thumbnail}`} />
        <Card.Body>
          <Card.Title className="section-title">{props.course.playlist.playlist_title}</Card.Title>

          <If condition={!props.ispublic}>
            <Card.Text>
              <ProgressBar now={now} className="mb-4 mt-2" label={now + ' %'} variant="#306998" />

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
                  </Link>
                  <Link
                    className="btn"
                    to={{
                      pathname: `/party/${uniqId()}`,
                      state: { payload: props.course.sections },
                    }}
                  >
                    Create Party
                  </Link>
                </Row>
              </Card.Text>
            </Card.Text>
          </If>
        </Card.Body>

        <ListGroup className="list-group-flush">
          {props.course.sections.map(item => {
            // thumbnail
            return (
              <If condition={item.section_title !== 'secretTitle'}>
                {console.log(item.section_title)}
                <ListGroupItem
                  key={item.section_title + 'aside'}
                  action
                  as="a"
                  href={`#${item.section_title.replace(/ /g, '_')}`}
                >
                  <Card.Link className="text-capitalize">{item.section_title}</Card.Link>{' '}
                </ListGroupItem>
              </If>
            );
          })}
        </ListGroup>
      </Card>
    </>
  );
}
export default Section;
