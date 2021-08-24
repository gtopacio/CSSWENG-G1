import * as DidaskoZoomStu from 'react-bootstrap';
import { useState } from 'react';

export default function Zoom() {

    const [show, setShow] = useState(false);

    const signUpClose = () => setShow(false);
    const signUpShow = () => setShow(true);

    return (
        <div className="container">
        <section className="custom-section" style={{minHeight:'90vh'}}>
            <div className="mb-3">
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
                            <DidaskoZoomStu.Button style={{marginRight:'1vh'}} href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" disabled>Join</DidaskoZoomStu.Button>
                            <DidaskoZoomStu.Button style={{marginLeft:'1vh'}} onClick={signUpShow}>Register</DidaskoZoomStu.Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DidaskoZoomStu.Modal show={show} onHide={signUpClose} aria-labelledby="contained-modal-title-vcenter" centered>
                        <DidaskoZoomStu.Modal.Header closeButton>
                            <DidaskoZoomStu.Modal.Title id="contained-modal-title-vcenter">
                                Edit Profile
                            </DidaskoZoomStu.Modal.Title>
                        </DidaskoZoomStu.Modal.Header>
                        <DidaskoZoomStu.Modal.Body>
                            <DidaskoZoomStu.InputGroup className="mb-3">
                                <DidaskoZoomStu.FormControl
                                placeholder="First Name"
                                aria-label="FirstName"
                                aria-describedby="basic-addon1"
                                readOnly
                                />
                            </DidaskoZoomStu.InputGroup>
                            <DidaskoZoomStu.InputGroup className="mb-3">
                                <DidaskoZoomStu.FormControl
                                placeholder="Last Name"
                                aria-label="LastName"
                                aria-describedby="basic-addon1"
                                readOnly
                                />
                            </DidaskoZoomStu.InputGroup>
                            <DidaskoZoomStu.InputGroup className="mb-3">
                                <DidaskoZoomStu.FormControl
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                readOnly
                                />
                            </DidaskoZoomStu.InputGroup>
                            <DidaskoZoomStu.InputGroup className="mb-3">
                                <DidaskoZoomStu.FormControl                                 
                                placeholder="Student"
                                aria-label="Type"
                                aria-describedby="basic-addon1"
                                readOnly>
                                </DidaskoZoomStu.FormControl>
                            </DidaskoZoomStu.InputGroup>                                         

                        </DidaskoZoomStu.Modal.Body>
                        <DidaskoZoomStu.Modal.Footer className="text-muted justify-content-end">
                            <DidaskoZoomStu.Button variant="primary" onClick="">Register</DidaskoZoomStu.Button>
                        </DidaskoZoomStu.Modal.Footer>    
                </DidaskoZoomStu.Modal>
        </section>
        </div>
    )
}
