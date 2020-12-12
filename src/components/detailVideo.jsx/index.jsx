import React, { useState, useEffect, useContext } from 'react'
import superagent from 'superagent';
import { RegisterContext } from '../../context/auth';
import { ListGroup, Image, Card, ProgressBar, ListGroupItem, Container, Row, Col } from 'react-bootstrap';
function Detailvideo(props) {
    // const [course, setCourse] = useState({ sections: [], playlist: {} })

    // const [ispublic, setIspublic] = useState(false)


    // const { match: { params } } = props
    // const { user, token } = useContext(RegisterContext);
    // console.log('user', user, token, params.id)

    // let url = `http://localhost:4000`

    // useEffect(() => {
    //     if (params.id) {

    //         superagent
    //             .get(`${url}/user/${user.username}/courses/${params.id}`)
    //             .set('authorization', `bearer ${token}`)
    //             .then(({ body }) => {
    //                 setCourse(body)
    //                 console.log('user2', body)

    //             }).catch(e => console.log(e))
    //     } else if (params.publicid) {
    //         superagent
    //             .get(`${url}/public/${params.publicid}`)
    //             .set('authorization', `bearer ${token}`)
    //             .then(({ body }) => {
    //                 setCourse(body)
    //                 setIspublic(true)
    //                 console.log('user2', body)

    //             }).catch(e => console.log(e))
    //     }

    // }, [params.id, params.publicid, token, url, user.username])
    // console.log('c', course)
    // // /:user/courses/:course'

    // return (

    //     <Container fluid >
    //         <Row noGutters >
    //             <Col className=' overflow-y height-100' xs={12} md={3}><Section course={course} ispublic={ispublic} /></Col>
    //             <Col className="overflow-y height-100" xs={12} md={9}> <VideoList course={course} ispublic={ispublic} /></Col>
    //         </Row>

    //     </Container>


    // )
}

export default Detailvideo
