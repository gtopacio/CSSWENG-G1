import React from 'react'
import defaultdp from "../images/defaultdp.jpg";
import image10 from "../images/image10.jpg";

import '../css/MyAccount.css';
import * as DidaskoAccount from 'react-bootstrap';
import { Link } from 'react-router-dom';

import * as BsIcons from 'react-icons/bs';
import * as ImIcons from 'react-icons/im';
import * as GoIcons from 'react-icons/go';

export default function MyAccount(props) {

    return (
        <section style={{height:'83vh'}}>
            <div className="space">

            </div>
            <div className="container">
                <div className="row align-items-start mt-6 mb-1">
                    <div className="col-3" id="profilePanel">
                        <div className="profileGroup">
                            <img src={defaultdp} width = "100px" height="100px"></img>
                            <div className="textGroup">
                                <Link to="#" style={{color: 'black',fontSize:'30px'}}>{props.user.firstName} {props.user.lastName}</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-9" id="coursesPanel">
                        <div id="textHeader">
                            <h1 style={{fontSize:'24px'}}>
                                Welcome back, {props.user.firstName}!
                            </h1>
                        </div>
                        <hr></hr>
                        <div>
                        <DidaskoAccount.Row>
                            <DidaskoAccount.Col>
                                <DidaskoAccount.Card style={{width: '26rem'}}>
                                    <DidaskoAccount.Card.Img variant="top" src={image10}
                                        style={{background: 'linear-gradient(180deg, rgba(17, 17, 17, 0.4) 0%, rgba(17, 17, 17, 0.72) 93.75%);'}}
                                    />
                                        <DidaskoAccount.Card.Body>
                                            <DidaskoAccount.Card.Title>Intermediate Math Course</DidaskoAccount.Card.Title>
                                            <DidaskoAccount.Card.Text>
                                                <DidaskoAccount.Container>
                                                    <DidaskoAccount.Row>
                                                        <DidaskoAccount.Col>
                                                            <div className="courseDetails">
                                                                <GoIcons.GoMortarBoard></GoIcons.GoMortarBoard>
                                                                <p>12 lessons</p>
                                                            </div>
                                                        </DidaskoAccount.Col>
                                                        <DidaskoAccount.Col>
                                                            <div className="courseDetails">
                                                                <BsIcons.BsPencil></BsIcons.BsPencil>
                                                                <p>12 tasks</p>
                                                            </div>
                                                        </DidaskoAccount.Col>
                                                        <DidaskoAccount.Col>
                                                            <div className="courseDetails">
                                                                <ImIcons.ImPlay></ImIcons.ImPlay>
                                                                <p>30 minutes</p>
                                                            </div>
                                                        </DidaskoAccount.Col>
                                                    </DidaskoAccount.Row>
                                                </DidaskoAccount.Container>
                                            </DidaskoAccount.Card.Text>
                                            <div className="courseButtonElements">
                                                <DidaskoAccount.Button variant="outline-dark">
                                                        Continue
                                                </DidaskoAccount.Button>
                                                <Link to="#" style={{color: 'black'}}>More</Link>
                                            </div>
                                        </DidaskoAccount.Card.Body>
                                </DidaskoAccount.Card>                                      
                            </DidaskoAccount.Col>
                            <DidaskoAccount.Col>
                            <DidaskoAccount.Card style={{width: '26rem'}}>
                                    <DidaskoAccount.Card.Img variant="top" src={image10}
                                        style={{background: 'linear-gradient(180deg, rgba(17, 17, 17, 0.4) 0%, rgba(17, 17, 17, 0.72) 93.75%);'}}
                                    />
                                        <DidaskoAccount.Card.Body>
                                            <DidaskoAccount.Card.Title>Begginer Science Course</DidaskoAccount.Card.Title>
                                            <DidaskoAccount.Card.Text>
                                                <DidaskoAccount.Container>
                                                    <DidaskoAccount.Row>
                                                        <DidaskoAccount.Col>
                                                            <div className="courseDetails">
                                                                <GoIcons.GoMortarBoard></GoIcons.GoMortarBoard>
                                                                <p>12 lessons</p>
                                                            </div>
                                                        </DidaskoAccount.Col>
                                                        <DidaskoAccount.Col>
                                                            <div className="courseDetails">
                                                                <BsIcons.BsPencil></BsIcons.BsPencil>
                                                                <p>12 tasks</p>
                                                            </div>
                                                        </DidaskoAccount.Col>
                                                        <DidaskoAccount.Col>
                                                            <div className="courseDetails">
                                                                <ImIcons.ImPlay></ImIcons.ImPlay>
                                                                <p>30 minutes</p>
                                                            </div>
                                                        </DidaskoAccount.Col>
                                                    </DidaskoAccount.Row>
                                                </DidaskoAccount.Container>
                                            </DidaskoAccount.Card.Text>
                                            <div className="courseButtonElements">
                                                <DidaskoAccount.Button variant="outline-dark">
                                                        Continue
                                                </DidaskoAccount.Button>
                                                <Link to="#" style={{color: 'black'}}>More</Link>
                                            </div>
                                        </DidaskoAccount.Card.Body>
                                </DidaskoAccount.Card>
                            </DidaskoAccount.Col>
                        </DidaskoAccount.Row>
                          
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
