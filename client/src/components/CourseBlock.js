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
    numTasks = 3,
    _id
}) {
    return (
        <Card style={{width: '26rem', height: 'fit-content'}}>
            <Card.Img variant="top" src={webinarPicture}
                style={{background: 'linear-gradient(180deg, rgba(17, 17, 17, 0.4) 0%, rgba(17, 17, 17, 0.72) 93.75%);'}}
            />
            <Card.Body>
                <Card.Title>{webinarTitle}</Card.Title>
                <div className="courseButtonElements">
                    <Link to={`/webinar?id=${_id}`} style={{color: 'white'}}>
                        <Button variant="outline-light">
                                Continue
                        </Button>
                    </Link>
                    
                </div>
            </Card.Body>
        </Card> 
    )
}
