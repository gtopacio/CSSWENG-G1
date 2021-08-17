import React from 'react'
import image10 from "../images/image10.jpg";
import "../css/AllCourses.css";
import * as DidaskoCard from 'react-bootstrap';
import { Link } from 'react-router-dom';

import * as BsIcons from 'react-icons/bs';
import * as ImIcons from 'react-icons/im';
import * as GoIcons from 'react-icons/go';

export default function Courses() {
    return (
        <section className="custom-section" style={{minHeight:'90vh'}}>
            <div className="mb-5"></div>
                <div>
                    <DidaskoCard.Container style={{minHeight:'90vh'}}>
                        <DidaskoCard.Row>
                            <DidaskoCard.Col>
                                <DidaskoCard.Card style={{width: '26rem'}}>
                                    <DidaskoCard.Card.Img variant="top" src={image10}
                                        style={{background: 'linear-gradient(180deg, rgba(17, 17, 17, 0.4) 0%, rgba(17, 17, 17, 0.72) 93.75%);'}}
                                    />
                                    <DidaskoCard.Card.Body>
                                        <Link to="#" style={{color: 'black',textDecoration:'none'}}><DidaskoCard.Card.Title>Intermediate Math Course</DidaskoCard.Card.Title></Link>
                                        <div className="courseButtonElements">
                                            <DidaskoCard.Button variant="outline-dark">
                                                    Continue
                                            </DidaskoCard.Button>
                                        </div>
                                    </DidaskoCard.Card.Body>
                                </DidaskoCard.Card>
                            </DidaskoCard.Col>
                            <DidaskoCard.Col>
                                <DidaskoCard.Card style={{ width: '26rem' }}>
                                    <DidaskoCard.Card.Img variant="top" src={image10} />
                                    <DidaskoCard.Card.Body>
                                    <Link to="#" style={{color: 'black',textDecoration:'none'}}><DidaskoCard.Card.Title>Begginer Science Course</DidaskoCard.Card.Title></Link>
                                        <div className="courseButtonElements">
                                            <DidaskoCard.Button variant="outline-dark">
                                                    Continue
                                            </DidaskoCard.Button>
                                        </div>
                                    </DidaskoCard.Card.Body>
                                </DidaskoCard.Card>                        
                            </DidaskoCard.Col>
                            <DidaskoCard.Col>
                                <DidaskoCard.Card style={{ width: '26rem' }}>
                                    <DidaskoCard.Card.Img variant="top" src={image10} />
                                    <DidaskoCard.Card.Body>
                                    <Link to="#" style={{color: 'black',textDecoration:'none'}}><DidaskoCard.Card.Title>Advanced English Course</DidaskoCard.Card.Title></Link>
                                            <div className="courseButtonElements">
                                                <DidaskoCard.Button variant="outline-dark">
                                                        Continue
                                                </DidaskoCard.Button>
                                            </div>
                                    </DidaskoCard.Card.Body>
                                </DidaskoCard.Card>
                            </DidaskoCard.Col>
                        </DidaskoCard.Row>
                        <div className="mb-5"></div>
                        <DidaskoCard.Row>
                            <DidaskoCard.Col>
                                <DidaskoCard.Card style={{width: '26rem'}}>
                                    <DidaskoCard.Card.Img variant="top" src={image10} />
                                    <DidaskoCard.Card.Body>
                                    <Link to="#" style={{color: 'black',textDecoration:'none'}}><DidaskoCard.Card.Title>Introduction to Calculus</DidaskoCard.Card.Title></Link>
                                        <div className="courseButtonElements">
                                            <DidaskoCard.Button variant="outline-dark">
                                                    Continue
                                            </DidaskoCard.Button>
                                        </div>
                                    </DidaskoCard.Card.Body>
                                </DidaskoCard.Card>
                            </DidaskoCard.Col>
                            <DidaskoCard.Col>
                                <DidaskoCard.Card style={{ width: '26rem' }}>
                                    <DidaskoCard.Card.Img variant="top" src={image10} />
                                    <DidaskoCard.Card.Body>
                                    <Link to="#" style={{color: 'black',textDecoration:'none'}}><DidaskoCard.Card.Title>Introduction to Chemistry</DidaskoCard.Card.Title></Link>
                                        <div className="courseButtonElements">
                                            <DidaskoCard.Button variant="outline-dark">
                                                    Continue
                                            </DidaskoCard.Button>
                                        </div>
                                    </DidaskoCard.Card.Body>
                                </DidaskoCard.Card>                        
                            </DidaskoCard.Col>
                            <DidaskoCard.Col>
                                <DidaskoCard.Card style={{ width: '26rem' }}>
                                    <DidaskoCard.Card.Img variant="top" src={image10} />
                                    <DidaskoCard.Card.Body>
                                    <Link to="#" style={{color: 'black',textDecoration:'none'}}><DidaskoCard.Card.Title>Introduction to Biochemistry</DidaskoCard.Card.Title></Link>
                                            <div className="courseButtonElements">
                                                <DidaskoCard.Button variant="outline-dark">
                                                        Continue Teaching
                                                </DidaskoCard.Button>
                                                <DidaskoCard.Button variant="outline-dark">
                                                        Edit Modules
                                                </DidaskoCard.Button>
                                            </div>
                                    </DidaskoCard.Card.Body>
                                </DidaskoCard.Card>
                            </DidaskoCard.Col>
                        </DidaskoCard.Row>
                    </DidaskoCard.Container>
                    <div className="space">
                    It seems you don't have any courses yet, <Link to="#" style={{color: 'black'}}>register?</Link>
                    </div>           
            </div>
        </section>
    )
}
