import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
function VideoList({ videos, setActiveVideo }) {
  // url_simple
  return (
    <ListGroup>
      {videos.map(video => {
        return (
          <ListGroup.Item
            className="pointer"
            onClick={() => {
              setActiveVideo(video.video_id);
            }}
          >
            {video.title}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

export default VideoList;
