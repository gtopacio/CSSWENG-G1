import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import image10 from "../../images/image10.jpg";
import { Link } from 'react-router-dom';

export default function TeachingBlock({webinar}) {
    return (
        <Col>
            <Card style={{ width: '26rem' }}>
                <Card.Img variant="top" src={webinar.bannerLink ? webinar.bannerLink : image10} />
                <Card.Body>
                <Link to="#" style={{color: 'black',textDecoration:'none'}}><Card.Title>{webinar.name}</Card.Title></Link>
                        <div className="courseButtonElements">
                            <Button variant="outline-dark">
                                    Continue Teaching
                            </Button>
                            <Button variant="outline-dark">
                                    Edit Modules
                            </Button>
                        </div>
                </Card.Body>
            </Card>
        </Col>
    )
}
