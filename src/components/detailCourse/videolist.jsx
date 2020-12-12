import React, { useState, useEffect, useContext } from 'react'
import superagent from 'superagent';
import { RegisterContext } from '../../context/auth';
import { ListGroup, Image, Card, ProgressBar, ListGroupItem, Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function VideoList(props) {
    let history = useHistory();


    // /:user/courses/:course'
    return (
        <ListGroup>
            {props.course.sections.map((item) => {
                // thumbnail
                return (
                    <>
                        <ListGroup.Item
                            id={item.section_title} key={item.section_title}>{item.section_title}</ListGroup.Item>
                        {item.videos.map((item1) => {
                            return (
                                <ListGroup.Item key={item.video_id + item.section_title}> <Image
                                    onClick={() => {
                                        console.log(item);
                                        history.push(`/video/${item.video_id}`);

                                    }}

                                    style={{ width: 200 }} src={item1.thumbnail} /> { item1.title}</ListGroup.Item>
                            )
                        })}
                    </>
                )
            })
            }
        </ListGroup>

    )
}
export default VideoList;