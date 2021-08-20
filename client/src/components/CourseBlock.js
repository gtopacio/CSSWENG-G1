import React from 'react';
import {Card, Container, Row, Col, Button} from 'react-bootstrap';
import * as BsIcons from 'react-icons/bs';
import * as ImIcons from 'react-icons/im';
import * as GoIcons from 'react-icons/go';
import image10 from "../images/image10.jpg";
import { Link } from 'react-router-dom';

export default function CourseBlock({ 
    webinarPicture=image10, 
    webinarTitle="Webinar Title", 
    videoLength = 30,
    numLessons = 12,
    numTasks = 3 
}) {
    return (
        <Card style={{width: '26rem'}}>
            <Card.Img variant="top" src={webinarPicture}
                style={{background: 'linear-gradient(180deg, rgba(17, 17, 17, 0.4) 0%, rgba(17, 17, 17, 0.72) 93.75%);'}}
            />
            <Card.Body>
                <Card.Title>{webinarTitle}</Card.Title>
                <Card.Text>
                    <Container>
                        <Row>
                            <Col>
                                <div className="courseDetails">
                                    <GoIcons.GoMortarBoard></GoIcons.GoMortarBoard>
                                    <p>{`${numLessons} lessons`}</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="courseDetails">
                                    <BsIcons.BsPencil></BsIcons.BsPencil>
                                    <p>{`${numTasks} tasks`}</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="courseDetails">
                                    <ImIcons.ImPlay></ImIcons.ImPlay>
                                    <p>{`${videoLength} minutes`}</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Card.Text>
                <div className="courseButtonElements">
                    <Button variant="outline-dark">
                            Continue
                    </Button>
                    <Link to="#" style={{color: 'black'}}>More</Link>
                </div>
            </Card.Body>
        </Card> 
    )
}
