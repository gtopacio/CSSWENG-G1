import React from 'react'
import image10 from "../images/image10.jpg";
import "../css/AllCourses.css";
import * as DidaskoCard from 'react-bootstrap';
import { Link } from 'react-router-dom';

import * as BsIcons from 'react-icons/bs';
import * as ImIcons from 'react-icons/im';
import * as GoIcons from 'react-icons/go';

export default function AllCourses() {
    return (
        <div>

            <DidaskoCard.Container>
                <DidaskoCard.Row>
                    <h1 className="welcomeText headers">Welcome back, Doug!</h1>
                </DidaskoCard.Row>
                <DidaskoCard.Row>
                    <h6 className="headers">Continue your journey: </h6>
                </DidaskoCard.Row>
                <DidaskoCard.Row>
                    <DidaskoCard.Col>
                        <DidaskoCard.Card style={{width: '26rem'}}>
                            <DidaskoCard.Card.Img variant="top" src={image10}
                                style={{background: 'linear-gradient(180deg, rgba(17, 17, 17, 0.4) 0%, rgba(17, 17, 17, 0.72) 93.75%);'}}
                             />
                            <DidaskoCard.Card.Body>
                                <DidaskoCard.Card.Title>Intermediate Math Course</DidaskoCard.Card.Title>
                                <DidaskoCard.Card.Text>
                                    <DidaskoCard.Container>
                                        <DidaskoCard.Row>
                                            <DidaskoCard.Col>
                                                <div className="courseDetails">
                                                    <GoIcons.GoMortarBoard></GoIcons.GoMortarBoard>
                                                    <p>12 lessons</p>
                                                </div>
                                            </DidaskoCard.Col>
                                            <DidaskoCard.Col>
                                                <div className="courseDetails">
                                                    <BsIcons.BsPencil></BsIcons.BsPencil>
                                                    <p>12 tasks</p>
                                                </div>
                                            </DidaskoCard.Col>
                                            <DidaskoCard.Col>
                                                <div className="courseDetails">
                                                    <ImIcons.ImPlay></ImIcons.ImPlay>
                                                    <p>30 minutes</p>
                                                </div>
                                            </DidaskoCard.Col>
                                        </DidaskoCard.Row>
                                    </DidaskoCard.Container>
                                </DidaskoCard.Card.Text>
                                <div className="courseButtonElements">
                                    <DidaskoCard.Button variant="outline-dark">
                                            Continue
                                    </DidaskoCard.Button>
                                    <Link to="#" style={{color: 'black'}}>More</Link>
                                </div>
                            </DidaskoCard.Card.Body>
                        </DidaskoCard.Card>
                    </DidaskoCard.Col>
                    <DidaskoCard.Col>
                        <DidaskoCard.Card style={{ width: '26rem' }}>
                            <DidaskoCard.Card.Img variant="top" src={image10} />
                            <DidaskoCard.Card.Body>
                                <DidaskoCard.Card.Title>Begginer Science Course</DidaskoCard.Card.Title>
                                <DidaskoCard.Card.Text>
                                    <DidaskoCard.Container>
                                        <DidaskoCard.Row>
                                            <DidaskoCard.Col>
                                                <div className="courseDetails">
                                                    <GoIcons.GoMortarBoard></GoIcons.GoMortarBoard>
                                                    <p>12 lessons</p>
                                                </div>
                                            </DidaskoCard.Col>
                                            <DidaskoCard.Col>
                                                <div className="courseDetails">
                                                    <BsIcons.BsPencil></BsIcons.BsPencil>
                                                    <p>12 tasks</p>
                                                </div>
                                            </DidaskoCard.Col>
                                            <DidaskoCard.Col>
                                                <div className="courseDetails">
                                                    <ImIcons.ImPlay></ImIcons.ImPlay>
                                                    <p>30 minutes</p>
                                                </div>
                                            </DidaskoCard.Col>
                                        </DidaskoCard.Row>
                                    </DidaskoCard.Container>
                                </DidaskoCard.Card.Text>
                                <div className="courseButtonElements">
                                    <DidaskoCard.Button variant="outline-dark">
                                            Continue
                                    </DidaskoCard.Button>
                                    <Link to="#" style={{color: 'black'}}>More</Link>
                                </div>
                            </DidaskoCard.Card.Body>
                        </DidaskoCard.Card>                        
                    </DidaskoCard.Col>
                    <DidaskoCard.Col>
                        <DidaskoCard.Card style={{ width: '26rem' }}>
                            <DidaskoCard.Card.Img variant="top" src={image10} />
                            <DidaskoCard.Card.Body>
                                <DidaskoCard.Card.Title>Advanced English Course</DidaskoCard.Card.Title>
                                    <DidaskoCard.Card.Text>
                                        <DidaskoCard.Container>
                                            <DidaskoCard.Row>
                                                <DidaskoCard.Col>
                                                    <div className="courseDetails">
                                                        <GoIcons.GoMortarBoard></GoIcons.GoMortarBoard>
                                                        <p>12 lessons</p>
                                                    </div>
                                                </DidaskoCard.Col>
                                                <DidaskoCard.Col>
                                                    <div className="courseDetails">
                                                        <BsIcons.BsPencil></BsIcons.BsPencil>
                                                        <p>12 tasks</p>
                                                    </div>
                                                </DidaskoCard.Col>
                                                <DidaskoCard.Col>
                                                    <div className="courseDetails">
                                                        <ImIcons.ImPlay></ImIcons.ImPlay>
                                                        <p>30 minutes</p>
                                                    </div>
                                                </DidaskoCard.Col>
                                            </DidaskoCard.Row>
                                        </DidaskoCard.Container>
                                    </DidaskoCard.Card.Text>
                                    <div className="courseButtonElements">
                                        <DidaskoCard.Button variant="outline-dark">
                                                Continue
                                        </DidaskoCard.Button>
                                        <Link to="#" style={{color: 'black'}}>More</Link>
                                    </div>
                            </DidaskoCard.Card.Body>
                        </DidaskoCard.Card>
                    </DidaskoCard.Col>
                </DidaskoCard.Row>
                <DidaskoCard.Row>
                    <h6 className="headers">Continue your journey: </h6>
                </DidaskoCard.Row>
                <DidaskoCard.Row>
                    <DidaskoCard.Col>
                        <DidaskoCard.Card style={{width: '26rem'}}>
                            <DidaskoCard.Card.Img variant="top" src={image10} />
                            <DidaskoCard.Card.Body>
                                <DidaskoCard.Card.Title>Introduction to Calculus</DidaskoCard.Card.Title>
                                <DidaskoCard.Card.Text>
                                    <DidaskoCard.Container>
                                        <DidaskoCard.Row>
                                            <DidaskoCard.Col>
                                                <div className="courseDetails">
                                                    <GoIcons.GoMortarBoard></GoIcons.GoMortarBoard>
                                                    <p>12 lessons</p>
                                                </div>
                                            </DidaskoCard.Col>
                                            <DidaskoCard.Col>
                                                <div className="courseDetails">
                                                    <BsIcons.BsPencil></BsIcons.BsPencil>
                                                    <p>12 tasks</p>
                                                </div>
                                            </DidaskoCard.Col>
                                            <DidaskoCard.Col>
                                                <div className="courseDetails">
                                                    <ImIcons.ImPlay></ImIcons.ImPlay>
                                                    <p>30 minutes</p>
                                                </div>
                                            </DidaskoCard.Col>
                                        </DidaskoCard.Row>
                                    </DidaskoCard.Container>
                                </DidaskoCard.Card.Text>
                                <div className="courseButtonElements">
                                    <DidaskoCard.Button variant="outline-dark">
                                            Continue
                                    </DidaskoCard.Button>
                                    <Link to="#" style={{color: 'black'}}>More</Link>
                                </div>
                            </DidaskoCard.Card.Body>
                        </DidaskoCard.Card>
                    </DidaskoCard.Col>
                    <DidaskoCard.Col>
                        <DidaskoCard.Card style={{ width: '26rem' }}>
                            <DidaskoCard.Card.Img variant="top" src={image10} />
                            <DidaskoCard.Card.Body>
                                <DidaskoCard.Card.Title>Introduction to Chemistry</DidaskoCard.Card.Title>
                                <DidaskoCard.Card.Text>
                                    <DidaskoCard.Container>
                                        <DidaskoCard.Row>
                                            <DidaskoCard.Col>
                                                <div className="courseDetails">
                                                    <GoIcons.GoMortarBoard></GoIcons.GoMortarBoard>
                                                    <p>12 lessons</p>
                                                </div>
                                            </DidaskoCard.Col>
                                            <DidaskoCard.Col>
                                                <div className="courseDetails">
                                                    <BsIcons.BsPencil></BsIcons.BsPencil>
                                                    <p>12 tasks</p>
                                                </div>
                                            </DidaskoCard.Col>
                                            <DidaskoCard.Col>
                                                <div className="courseDetails">
                                                    <ImIcons.ImPlay></ImIcons.ImPlay>
                                                    <p>30 minutes</p>
                                                </div>
                                            </DidaskoCard.Col>
                                        </DidaskoCard.Row>
                                    </DidaskoCard.Container>
                                </DidaskoCard.Card.Text>
                                <div className="courseButtonElements">
                                    <DidaskoCard.Button variant="outline-dark">
                                            Continue
                                    </DidaskoCard.Button>
                                    <Link to="#" style={{color: 'black'}}>More</Link>
                                </div>
                            </DidaskoCard.Card.Body>
                        </DidaskoCard.Card>                        
                    </DidaskoCard.Col>
                    <DidaskoCard.Col>
                        <DidaskoCard.Card style={{ width: '26rem' }}>
                            <DidaskoCard.Card.Img variant="top" src={image10} />
                            <DidaskoCard.Card.Body>
                                <DidaskoCard.Card.Title>Introduction to Biochemistry</DidaskoCard.Card.Title>
                                    <DidaskoCard.Card.Text className="justify-conte">
                                        <DidaskoCard.Container>
                                            <DidaskoCard.Row>
                                                <DidaskoCard.Col>
                                                    <div className="courseDetails">
                                                        <GoIcons.GoMortarBoard></GoIcons.GoMortarBoard>
                                                        <p>12 lessons</p>
                                                    </div>
                                                </DidaskoCard.Col>
                                                <DidaskoCard.Col>
                                                    <div className="courseDetails">
                                                        <BsIcons.BsPencil></BsIcons.BsPencil>
                                                        <p>12 tasks</p>
                                                    </div>
                                                </DidaskoCard.Col>
                                                <DidaskoCard.Col>
                                                    <div className="courseDetails">
                                                        <ImIcons.ImPlay></ImIcons.ImPlay>
                                                        <p>30 minutes</p>
                                                    </div>
                                                </DidaskoCard.Col>
                                            </DidaskoCard.Row>
                                        </DidaskoCard.Container>
                                    </DidaskoCard.Card.Text>
                                    <div className="courseButtonElements">
                                        <DidaskoCard.Button variant="outline-dark">
                                                Continue
                                        </DidaskoCard.Button>
                                        <Link to="#" style={{color: 'black'}}>More</Link>
                                    </div>
                            </DidaskoCard.Card.Body>
                        </DidaskoCard.Card>
                    </DidaskoCard.Col>
                </DidaskoCard.Row>
            </DidaskoCard.Container>
            <div className="space">

            </div>
        </div>
    )
}
