import React from 'react';
import { Card, Button, ProgressBar } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { FiShare2 } from 'react-icons/fi';
function UserCard({ course, addToPublic, deleteCourse }) {
  let history = useHistory();
  let now = (course.time_watched / course.total_duration) * 100;

  return (
    <Card>
      <Card.Img
        onClick={() => {
          console.log(course);
          history.push(`/course/${course._id}`);
        }}
        variant="top"
        src={course.playlist.thumbnail}
      />
      <Card.Body>
        <Card.Title>{course.playlist.playlist_title}</Card.Title>
        <ProgressBar now={now} label={`${now}%`} className="mb-2" />
      </Card.Body>
      <Card.Body className="justify-content-between d-flex">
        <Card.Link
          onClick={() => {
            deleteCourse(course._id);
          }}
        >
          <BsTrash className="font-1-5" />
        </Card.Link>
        <Card.Link
          onClick={() => {
            addToPublic(course._id);
            history.push('/public');
          }}
        >
          <FiShare2 className="ml-2" />
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
