import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import image10 from "../../images/image10.jpg";
import { Link } from 'react-router-dom';


export default function TeachingBlock({webinar}) {
    return (
        <Col>
            <Card style={{ width: '26rem' }}>
                <Card.Img variant="top" src={webinar.bannerLink ? webinar.bannerLink : image10} style={{maxHeight: "18vh", objectFit: "cover", objectPosition: "100% 0"}} />
                <Card.Body>
                <Link to="#" style={{color: 'white',textDecoration:'none'}}><Card.Title>{webinar.name}</Card.Title></Link>
                        <div className="courseButtonElements">
                            <Button variant="outline-light">
                                    Continue Teaching
                            </Button>
                            <Button variant="outline-light">
                                    Edit Modules
                            </Button>
                        </div>
                </Card.Body>
            </Card>
        </Col>
    )
}
