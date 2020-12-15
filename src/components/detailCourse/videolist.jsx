import React, { useState } from 'react';
import { ListGroup, Image, Modal, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { If, Then, Else } from 'react-if';

function VideoList(props) {
  let history = useHistory();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // /:user/courses/:course'
  return (
    <ListGroup>
      {props.course.sections.map((item) => {
        return (
          <>
            <ListGroup.Item id={item.section_title} key={item.section_title}>
              {item.section_title}
            </ListGroup.Item>
            {item.videos.map((item1) => {
              return (
                <If condition={!props.ispublic}>
                  <Then>
                    <ListGroup.Item
                      action
                      key={item.video_id + item.section_title}
                      onClick={() => {
                        history.push(
                          `/video/${props.course._id}/${item1.video_id}`
                        );
                      }}
                    >
                      <Image style={{ width: 150 }} src={item1.thumbnail} />

                      {item1.title}
                    </ListGroup.Item>
                  </Then>
                  <Else>
                    <ListGroup.Item
                      key={item.video_id + item.section_title}
                      onClick={() => {
                        handleShow();
                      }}
                    >
                      <Image style={{ width: 150 }} src={item1.thumbnail} />

                      {item1.title}
                    </ListGroup.Item>
                  </Else>
                </If>
              );
            })}

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Invalid Action</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                You have to add the course to your courses to be able to view
                the contents
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      })}
    </ListGroup>
  );
}
export default VideoList;
