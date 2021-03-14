import React, { useState, useEffect, useContext } from 'react';
import superagent from 'superagent';
import { RegisterContext } from '../../context/auth';
import { ListGroup, ProgressBar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { BsCircle, BsCheckCircle } from 'react-icons/bs';
import { If, Else, Then } from 'react-if';

function WatchStatus(props) {
  const [isWatched, setIsWatched] = useState(props.item.isWatched);
  const url = 'https://course-fellows.herokuapp.com';

  const handleIsWatched = () => {
    superagent
      .put(`${url}/user/${props.user}/courses/${props.courseId}/${props.item.video_id}/isWatched`)
      .set('authorization', `bearer ${props.token}`)
      .then(({ body }) => {
        setIsWatched(!isWatched);
        props.progressCheck();
      });
  };
  return (
    <If condition={!isWatched}>
      <Then>
        <BsCircle
          onClick={() => {
            handleIsWatched();
          }}
          className="mr-2 "
        />
      </Then>
      <Else>
        <BsCheckCircle
          className="mr-2 sub-color"
          onClick={() => {
            handleIsWatched();
          }}
        />
      </Else>
    </If>
  );
}

function VideoList(props) {
  const url = 'https://course-fellows.herokuapp.com';
  let history = useHistory();
  const { user, token } = useContext(RegisterContext);
  const [course, setCourse] = useState({ sections: [], playlist: {} });
  const [progress, setProgress] = useState(0);
  const [changed, setChanged] = useState(false);

  // n = (course.time_watched / course.total_duration) *100
  const progressCheck = () => {
    setChanged(!changed);
  };

  useEffect(() => {
    if (props.publicid) {
      superagent
        .get(`${url}/public/${props.courseId}`)
        .set('authorization', `bearer ${token}`)
        .then(({ body }) => {
          setCourse(body);
        })
        .catch(e => console.log(e));
    } else {
      superagent
        .get(`${url}/user/${props.user}/courses/${props.courseId}`)
        .set('authorization', `bearer ${token}`)
        .then(({ body }) => {
          setCourse(body);
          setProgress(Math.floor((body.time_watched / body.total_duration) * 100));
        })
        .catch(e => console.log(e));
    }
  }, [props.courseId, props.publicid, props.user, token, user.username, changed]);

  return (
    <>
      <div className="px-3">
        <ProgressBar now={progress} className="mb-2 progress-sub-color" />
      </div>
      <p className="text-center mt-3">{progress}% COMPLETE</p>
      <ListGroup>
        {course.sections.map(item => {
          return (
            <>
              <ListGroup.Item
                id={item.section_title}
                key={item.section_title}
                className="text-capitalize section-title"
              >
                {item.section_title}
              </ListGroup.Item>
              {item.videos.map(item1 => {
                return (
                  <>
                    <ListGroup.Item action key={item1.video_id + item.section_title}>
                      <WatchStatus
                        key={item1.video_id + 'check'}
                        item={item1}
                        courseId={props.courseId}
                        user={user.username}
                        token={token}
                        progressCheck={progressCheck}
                      />
                      <span
                        onClick={() => {
                          history.push(`/video/${course._id}/${item1.video_id}`);
                        }}
                      >
                        {item1.title}
                      </span>
                    </ListGroup.Item>
                  </>
                );
              })}
            </>
          );
        })}
      </ListGroup>
    </>
  );
}

export default VideoList;
