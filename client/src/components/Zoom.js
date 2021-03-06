import React from 'react'
import * as DidaskoZoom from 'react-bootstrap';
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import '../css/Zoom.css';

export default function Zoom() {
    const [user, setUser] = useContext(UserContext);
    const [show, setShow] = useState(false);


    const signUpClose = () => setShow(false);
    const signUpShow = () => setShow(true);

    return (
        <section className="custom-section" style={{minHeight:'90vh'}}>
            <div className="mb-3">
            </div>
            <div id="searchGroup">
                <DidaskoZoom.Row>
                    <DidaskoZoom.Col xs={9}>
                        <DidaskoZoom.FormControl
                                type="search"
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"
                                >
                        </DidaskoZoom.FormControl>
                    </DidaskoZoom.Col>
                    <DidaskoZoom.Col xs={3}>
                        <DidaskoZoom.Button 
                                    variant="outline-dark"
                                    >
                                    Search
                        </DidaskoZoom.Button>
                    </DidaskoZoom.Col>
                </DidaskoZoom.Row>
            </div>
            <div className="container pt-4" style={{maxWidth:'1320px',minHeight:'100px',zIndex:-1,position:'relative'}}>
                <div className="row">
                    <div className="card mb-3 mx-auto" style={{paddingRight:'0'}}>
                        <div className="row g-2" style={{minHeight:'inherit',display:'flex'}}>
                            <div className="row g-3" style={{minHeight:'inherit',display:'flex'}}>
                                <h4>Webinar: Testing 123 </h4>
                            </div>
                            <p>Professor: Professor Ballsack</p>
                            <div className="mb-3 col-12">
                            <DidaskoZoom.Button style={{marginRight:'1vh'}} href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Join</DidaskoZoom.Button>
                            <DidaskoZoom.Button style={{marginLeft:'1vh'}} href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Edit</DidaskoZoom.Button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <DidaskoZoom.Modal show={show} onHide={signUpClose} aria-labelledby="contained-modal-title-vcenter" centered>
                        <DidaskoZoom.Modal.Header closeButton>
                            <DidaskoZoom.Modal.Title id="contained-modal-title-vcenter">
                                Edit Profile
                            </DidaskoZoom.Modal.Title>
                        </DidaskoZoom.Modal.Header>
                        <DidaskoZoom.Modal.Body>
                            <DidaskoZoom.InputGroup className="mb-3">
                                <DidaskoZoom.FormControl
                                placeholder="Webinar Title"
                                aria-label="WebinarName"
                                aria-describedby="basic-addon1"
                                />
                            </DidaskoZoom.InputGroup>
                            <DidaskoZoom.InputGroup className="mb-3">
                                <DidaskoZoom.Form.Select aria-label="Default select example">
                                <option>Professor</option>
                                <option value="1">BALLSACK, Ligma</option>
                                <option value="2">ROSIMA, Rayvhen</option>
                                <option value="3">ILAGAN, Vincent</option>
                                <option value="4">TOPACIO, Geoff</option>
                                </DidaskoZoom.Form.Select>
                            </DidaskoZoom.InputGroup>                                         
                            <DidaskoZoom.InputGroup className="mb-3">
                                <DidaskoZoom.FormControl
                                placeholder="Zoom Link (e.g. https://zoom.us/j/2400983088?pwd=TDVXQWRkSTU5K1ZQMzJwQzRnL3VlQT09)"
                                aria-label="ZoomLink"
                                aria-describedby="basic-addon1"
                                />
                            </DidaskoZoom.InputGroup>
                            <DidaskoZoom.InputGroup className="mb-3">
                                <DidaskoZoom.FormControl
                                placeholder="Meeting ID"
                                aria-label="ZoomID"
                                aria-describedby="basic-addon1"
                                />
                            </DidaskoZoom.InputGroup>
                            <DidaskoZoom.InputGroup className="mb-3">
                                <DidaskoZoom.FormControl
                                placeholder="Zoom Password"
                                aria-label="ZoomPW"
                                aria-describedby="basic-addon1"
                                />
                            </DidaskoZoom.InputGroup>
                        </DidaskoZoom.Modal.Body>
                        <DidaskoZoom.Modal.Footer className="text-muted justify-content-end">
                            <DidaskoZoom.Button variant="primary" onClick="">Create</DidaskoZoom.Button>
                        </DidaskoZoom.Modal.Footer>    
                </DidaskoZoom.Modal>
        </section>
    )
}
