import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import image10 from "../../images/image10.jpg";

export default function StudentBlock({ webinar }) {
    return (
        <Col>
            <Card style={{width: '26rem'}}>
                <Card.Img variant="top" src={webinar.bannerLink ? webinar.bannerLink : image10}
                    style={{background: 'linear-gradient(180deg, rgba(17, 17, 17, 0.4) 0%, rgba(17, 17, 17, 0.72) 93.75%);', maxHeight: "18vh", objectFit: "cover", objectPosition: "100% 0"}}
                />
                <Card.Body>
                    <Link to="#" style={{color: 'black',textDecoration:'none'}}><Card.Title>{webinar.name}</Card.Title></Link>
                    <div className="courseButtonElements">
                        <Button variant="outline-dark">
                                Continue
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}
