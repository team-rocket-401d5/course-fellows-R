import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RegisterContext } from '../../context/auth';
import superagent from 'superagent';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Modal, Button, Container, ListGroup } from 'react-bootstrap';
import { BsFillPlusCircleFill, BsXCircleFill } from 'react-icons/bs';
import { v1 as uuid } from 'uuid';
import SectionForm from './sectionForm';

function CustomizedCourse({ location }) {
  const history = useHistory();
  const { token, user } = useContext(RegisterContext);
  // eslint-disable-next-line no-unused-vars
  const [importedPlaylist, setImportedPlaylist] = useState({});
  const [sections, setSections] = useState([]);
  const [sectionName, setSectionName] = useState('');
  const [show, setShow] = useState(false);
  const [videoIndex, setVideoIndex] = useState(false);
  const [selectedSection, setSelectedSection] = useState(false);
  const handleClose = () => setShow(false);
  let backend = 'https://course-fellows.herokuapp.com';
  const handleShow = () => setShow(true);

  function create(url) {
    let playlist = { playlist: url };
    superagent
      .post(`${backend}/playlist`)
      .send(playlist)
      .set('authorization', `bearer ${token}`)
      .then(({ body: result }) => {
        setImportedPlaylist(result);
        setSections([{ section_title: 'secretTitle', videos: [...result.items] }]);
      })
      .catch(e => console.log(e));
  }

  // '/:user/courses/:course'
  function edit(id) {
    // /:user/courses/:course'
    superagent
      .get(`${backend}/user/${user.username}/courses/${id}`)
      .set('authorization', `bearer ${token}`)
      .then(({ body: result }) => {
        setImportedPlaylist({ author: result.author, playlist: result.playlist });
        setSections(result.sections);
      })
      .catch(e => console.log(e));
  }

  function insertAt(array, index, element) {
    array.splice(index, 0, element);
  }

  function createSection() {
    const currentSections = sections;
    // if no sections yet
    if (sections.length === 1 && sections[0].section_title === 'secretTitle') {
      currentSections[0].section_title = sectionName;
      setSections(currentSections);
      return;
    }
    // get the index of the clicked section
    const sectionIndex = sections.findIndex(section => section.section_title === selectedSection);
    // get the prev videos and post videos
    const preVideos = sections[sectionIndex].videos.slice(0, videoIndex);
    const postVideos = sections[sectionIndex].videos.slice(videoIndex);
    currentSections[sectionIndex].videos = preVideos;
    const newSection = {
      section_title: sectionName,
      videos: postVideos,
    };
    insertAt(currentSections, sectionIndex + 1, newSection);
    setSections(currentSections);
  }

  function handleDragEnd(result) {
    let currentSections = [...sections];
    const [toTransfer] = currentSections[result.source.droppableId].videos.splice(
      result.source.index,
      1
    );
    currentSections[result.destination.droppableId].videos.splice(
      result.destination.index,
      0,
      toTransfer
    );
    setSections(currentSections);
  }

  function deleteVideo(sectionName, id) {
    const currentSections = [...sections];
    const sectionIndex = currentSections.findIndex(
      section => section.section_title === sectionName
    );
    const videoIndex = currentSections[sectionIndex].videos.findIndex(
      video => video.video_id === id
    );
    currentSections[sectionIndex].videos.splice(videoIndex, 1);
    setSections(currentSections);
  }

  function addCourse() {
    const { playlist, author } = importedPlaylist;
    superagent
      .post(`${backend}/user/${user.username}/course`)
      .send({ playlist, author, sections, user: user.username })
      .set('authorization', `bearer ${token}`)
      .then(() => {
        history.push('/');
      })
      .catch(e => console.log(e));
  }

  function editCourse() {
    const { playlist, author } = importedPlaylist;
    // /:user/courses/:course
    superagent
      .put(`${backend}/user/${user.username}/courses/${location.state.payload}`)
      .send({ playlist, author, sections, user: user.username })
      .set('authorization', `bearer ${token}`)
      .then(() => {
        history.push(`/course/${location.state.payload}`);
      })
      .catch(e => console.log(e));
  }

  useEffect(() => {
    switch (location.state.method) {
      case 'create':
        create(location.state.payload);
        break;
      case 'edit':
        edit(location.state.payload);
        break;

      default:
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <section>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body>
            <SectionForm sectionName={sectionName} setSectionName={setSectionName} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleClose();
                setSectionName("");
                createSection();
              }}
            >
              create
            </Button>
          </Modal.Footer>
        </Modal>
        <div
          className="d-flex mt-3 mb-2"
          style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}
        >
          <h1>Organize Course</h1>
          <div className="btn-group">
            {location.state.method === 'create' ? (
              <button className="btn" onClick={addCourse}>
                Create
              </button>
            ) : (
              <button className="btn" onClick={editCourse}>
                edit
              </button>
            )}

            <button
              className="btn ml-2"
              onClick={() => {
                history.push('/');
              }}
            >
              Cancel
            </button>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          {sections.map((section, index) => {
            return (
              <Droppable key={uuid()} droppableId={index.toString()}>
                {provided => (
                  <ListGroup
                    className="section Unstyled"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {section.section_title === 'secretTitle' ? (
                      ''
                    ) : (
                      <ListGroup.Item className="section-title mt-3 main-color main-white">
                        {section.section_title}
                      </ListGroup.Item>
                    )}

                    {section.videos.map((video, index) => (
                      <Draggable
                        key={video.video_id}
                        draggableId={video.video_id}
                        index={index}
                        id={index}
                      >
                        {provided => (
                          <ListGroup.Item
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <span
                              className="pointer"
                              onClick={() => {
                                handleShow();
                                setVideoIndex(index);
                                setSelectedSection(section.section_title);
                              }}
                            >
                              <BsFillPlusCircleFill
                                color="#306998"
                                className="main-color-bg mr-2"
                              />
                            </span>
                            <span
                              className="pointer"
                              onClick={() => {
                                deleteVideo(section.section_title, video.video_id);
                              }}
                            >
                              <BsXCircleFill color="#306998" className="main-color-bg mr-2" />
                            </span>

                            <span>{video.title}</span>
                          </ListGroup.Item>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ListGroup>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      </section>
    </Container>
  );
}

export default CustomizedCourse;
