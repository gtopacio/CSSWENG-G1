import React from 'react'
import image10 from "../images/image10.jpg";
import "../css/AllCourses.css";
import * as DidaskoAssign from 'react-bootstrap';
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';


export default function Assign() {

    const [user, setUser] = useContext(UserContext);
    const [show, setShow] = useState(false);


    const signUpClose = () => setShow(false);
    const signUpShow = () => setShow(true);

    return (
        <section className="custom-section" style={{minHeight:'90vh'}}>
                <DidaskoAssign.Container className="justify-content-md-center" style={{minHeight:'inherit',display:'flex'}}>
                    <DidaskoAssign.Row className="align-items-center justify-content-md-center" style={{minHeight:'inherit',display:'flex'}}>
                        <DidaskoAssign.Col>
                        <DidaskoAssign.FloatingLabel
                            controlId="floatingInput"
                            label="Search for the Course"
                            className="align-items-center justify-content-md-center"
                        >
                            <DidaskoAssign.Form.Control type="text" placeholder="" />
                        </DidaskoAssign.FloatingLabel>
                        <DidaskoAssign.Form.Select aria-label="Default select example">
                            <option>Filter by</option>
                            <option value="1">Mathemathics</option>
                            <option value="2">Science</option>
                            <option value="3">English</option>
                        </DidaskoAssign.Form.Select>
                        <DidaskoAssign.Button variant="light" size="sm">Filter</DidaskoAssign.Button>
                            <DidaskoAssign.Card style={{width: '26rem'}}>
                                <DidaskoAssign.Card.Img variant="top" src={image10}
                                    style={{background: 'linear-gradient(180deg, rgba(17, 17, 17, 0.4) 0%, rgba(17, 17, 17, 0.72) 93.75%);'}}
                                />
                                <DidaskoAssign.Card.Body>
                                    <DidaskoAssign.Card.Title>Intermediate Math Course</DidaskoAssign.Card.Title>
                                    <DidaskoAssign.Card.Text>
                                        <DidaskoAssign.Container>
                                            <DidaskoAssign.Row  className="align-items-center justify-content-md-center">
                                                Professor: 
                                            </DidaskoAssign.Row>
                                        </DidaskoAssign.Container>
                                    </DidaskoAssign.Card.Text>
                                    <div className="courseButtonElements">
                                        <DidaskoAssign.Button 
                                        variant="outline-dark"
                                        onClick={signUpShow}
                                        >
                                                Assign
                                        </DidaskoAssign.Button>
                                    </div>
                                </DidaskoAssign.Card.Body>
                            </DidaskoAssign.Card>
                        </DidaskoAssign.Col>
                    </DidaskoAssign.Row>
                </DidaskoAssign.Container>
                <div className="space">
                </div>
                <DidaskoAssign.Modal show={show} onHide={signUpClose} aria-labelledby="contained-modal-title-vcenter" centered>
                    <DidaskoAssign.Modal.Header closeButton>
                        <DidaskoAssign.Modal.Title id="contained-modal-title-vcenter">
                            Edit Profile
                        </DidaskoAssign.Modal.Title>
                    </DidaskoAssign.Modal.Header>
                    <DidaskoAssign.Modal.Body>
                        <DidaskoAssign.InputGroup className="mb-3">
                            <DidaskoAssign.FormControl
                            placeholder="First Name"
                            aria-label="fName"
                            aria-describedby="basic-addon1"
                            />
                        </DidaskoAssign.InputGroup>
                        <DidaskoAssign.InputGroup className="mb-3">
                            <DidaskoAssign.FormControl
                            placeholder="Last Name"
                            aria-label="lName"
                            aria-describedby="basic-addon1"
                            />
                        </DidaskoAssign.InputGroup>
                        <DidaskoAssign.InputGroup className="mb-3 align-items-center justify-content-md-center">
                        <DidaskoAssign.Button variant="primary" onClick="">Filter</DidaskoAssign.Button>
                        </DidaskoAssign.InputGroup>                                                
                        <DidaskoAssign.InputGroup className="mb-3">
                            <DidaskoAssign.FormControl
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />
                        </DidaskoAssign.InputGroup>
                        <DidaskoAssign.InputGroup className="mb-3 align-items-center justify-content-md-center">
                        <DidaskoAssign.Button variant="primary" onClick="">Filter</DidaskoAssign.Button>
                        </DidaskoAssign.InputGroup>
                        Assigned to: 
                    </DidaskoAssign.Modal.Body>
                    <DidaskoAssign.Modal.Footer className="text-muted justify-content-end">
                        <DidaskoAssign.Button variant="primary" onClick="">Confirm</DidaskoAssign.Button>
                    </DidaskoAssign.Modal.Footer>    
            </DidaskoAssign.Modal>
        </section>
    )
}
