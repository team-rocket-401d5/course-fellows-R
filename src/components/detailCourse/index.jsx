import React, { useState, useEffect, useContext } from 'react'
import superagent from 'superagent';
import { RegisterContext } from '../../context/auth';
import { ListGroup, Image, Card, ProgressBar, ListGroupItem, Container, Row, Col } from 'react-bootstrap';
import VideoList from './videolist'
import Section from './Section'
// function VideoList(props) {


//     // /:user/courses/:course'
//     return (
//         <ListGroup>
//             {props.course.sections.map((item) => {
//                 // thumbnail
//                 return (
//                     <>
//                         <ListGroup.Item id={item.section_title} key={item.section_title}>{item.section_title}</ListGroup.Item>
//                         {item.videos.map((item1) => {
//                             return (
//                                 <ListGroup.Item key={item.video_id + item.section_title}> <Image style={{ width: 200 }} src={item1.thumbnail} /> { item1.title}</ListGroup.Item>
//                             )
//                         })}
//                     </>
//                 )
//             })
//             }
//         </ListGroup>

//     )
// }
// function Section(props) {
//     let now = (props.course.time_watched / props.course.total_duration) * 100;

//     console.log('prop', props)
//     // /:user/courses/:course'
//     return (
//         <>
//             <Card style={{ width: '100%' }}>
//                 <Card.Img variant="top" src={`${props.course.playlist.thumbnail}`} />
//                 <Card.Body>
//                     <Card.Title>{props.course.playlist.playlist_title}</Card.Title>
//                     <Card.Text>
//                         <ProgressBar now={now} className="mb-2" />
//                         <Card.Text style={{ textAlign: 'center' }}> {now}% COMPLETE</Card.Text>
//                     </Card.Text>
//                 </Card.Body>



//                 <ListGroup className="list-group-flush">

//                     {props.course.sections.map((item) => {
//                         // thumbnail
//                         return (
//                             <>

//                                 <ListGroupItem > <Card.Link href={`#${item.section_title}`}>{item.section_title}</Card.Link> </ListGroupItem>


//                             </>
//                         )
//                     })
//                     }
//                 </ListGroup>
//             </Card>
//         </>

//     )
// }


function DetailCourse(props) {
    const [course, setCourse] = useState({ sections: [], playlist: {} })

    const [ispublic, setIspublic] = useState(false)


    const { match: { params } } = props
    const { user, token } = useContext(RegisterContext);
    console.log('user', user, token, params.id)

    let url = `http://localhost:4000`

    useEffect(() => {
        if (params.id) {

            superagent
                .get(`${url}/user/${user.username}/courses/${params.id}`)
                .set('authorization', `bearer ${token}`)
                .then(({ body }) => {
                    setCourse(body)
                    console.log('user2', body)

                }).catch(e => console.log(e))
        } else if (params.publicid) {
            superagent
                .get(`${url}/public/${params.publicid}`)
                .set('authorization', `bearer ${token}`)
                .then(({ body }) => {
                    setCourse(body)
                    setIspublic(true)
                    console.log('user2', body)

                }).catch(e => console.log(e))
        }

    }, [params.id, params.publicid, token, url, user.username])
    console.log('c', course)
    // /:user/courses/:course'

    return (

        <Container fluid >
            <Row noGutters >
                <Col className=' overflow-y height-100' xs={12} md={3}><Section course={course} ispublic={ispublic} /></Col>
                <Col className="overflow-y height-100" xs={12} md={9}> <VideoList course={course} ispublic={ispublic} /></Col>
            </Row>

        </Container>


    )
}

export default DetailCourse;