import React from 'react';
import { Card, Button, ProgressBar } from 'react-bootstrap';
import { BsX } from 'react-icons/bs';
import { FaRegPaperPlane } from 'react-icons/fa';

function UserCard({ course, addToPublic, deleteCourse }) {
  console.log(course);
  let now = (course.time_watched / course.total_duration) * 100;
  return (
    <Card>
      <div className="d-flex justify-content-end pointer">
        <BsX
          className="font-1-5"
          onClick={() => {
            console.log(course);
            deleteCourse(course._id);
          }}
        />
      </div>
      <Card.Img variant="top" src={course.playlist.thumbnail} />
      <Card.Body>
        <Card.Title>{course.playlist.playlist_title}</Card.Title>
        <ProgressBar now={now} label={`${now}%`} className="mb-2" />
        <div className="d-flex flex-wrap justify-content-end user-courses-btns">
          <Button
            onClick={() => {
              console.log(course);
              addToPublic(course._id);
            }}
          >
            Share
            <FaRegPaperPlane className="ml-2" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
