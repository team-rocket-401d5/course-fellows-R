import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { FiShare2 } from 'react-icons/fi';

function UserCard({ course, addToPublic, deleteCourse }) {
  let history = useHistory();
  let now = Math.floor((course.time_watched / course.total_duration) * 100);

  return (
    <Card>
      <Card.Img
        onClick={() => {
          history.push(`/course/${course._id}`);
        }}
        variant="top"
        src={course.playlist.thumbnail}
        className="pointer"
      />
      <Card.Body>
        <Card.Title>{course.playlist.playlist_title}</Card.Title>
        <ProgressBar now={now} label={`${now}%`} className="mb-2" />
      </Card.Body>
      <Card.Body className="justify-content-end d-flex">
        <Card.Link
          className="pointer"
          onClick={() => {
            deleteCourse(course._id);
          }}
        >
          <BsTrash className="font-1-5 icon" />
        </Card.Link>
        <Card.Link
          className="pointer"
          onClick={() => {
            addToPublic(course._id);
            history.push('/public');
          }}
        >
          <FiShare2 className=" icon" />
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
