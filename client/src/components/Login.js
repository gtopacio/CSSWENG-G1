import React from 'react'
import * as DidaskoLogin from 'react-bootstrap';
import '../css/Login.css' ;
import { useState } from 'react';

export default function Login() {
    const [show, setShow] = useState(false);

    const signUpClose = () => setShow(false);
    const signUpShow = () => setShow(true);

    return (
        <section className = "bg-container" style={{height:'83vh'}}>
            <DidaskoLogin.Card className="card shadow top-50 start-50 translate-middle" style={{maxWidth:'30em',borderRadius:'15px'}}>
                <DidaskoLogin.Card.Header style={{fontSize:"30px"}}>Login</DidaskoLogin.Card.Header>
                <DidaskoLogin.Card.Body>
                <DidaskoLogin.InputGroup className="mb-3">
                    <DidaskoLogin.FormControl
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    />
                </DidaskoLogin.InputGroup>
                <DidaskoLogin.InputGroup className="mb-3">
                    <DidaskoLogin.FormControl
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    type="password"
                    />
                </DidaskoLogin.InputGroup>
                    <DidaskoLogin.Button variant="primary">Login</DidaskoLogin.Button>
                </DidaskoLogin.Card.Body>
                <DidaskoLogin.Card.Footer className="text-muted">
                <div>  
                    <p className="mt-0 mb-1" style={{fontSize:'11pt'}}>
                        Don't have an account? 
                        <DidaskoLogin.Button
                        variant="link"
                        onClick={signUpShow}
                        style={{boxShadow: 'none',textDecoration:'none',padding:'0px',fontSize:'11pt'}}>Sign up here!</DidaskoLogin.Button>
                    </p>
                </div>  
                    
                </DidaskoLogin.Card.Footer>
            </DidaskoLogin.Card>

            <DidaskoLogin.Modal show={show} onHide={signUpClose} aria-labelledby="contained-modal-title-vcenter" centered>
                    <DidaskoLogin.Modal.Header closeButton>
                        <DidaskoLogin.Modal.Title id="contained-modal-title-vcenter">
                            Sign Up
                        </DidaskoLogin.Modal.Title>
                    </DidaskoLogin.Modal.Header>
                    <DidaskoLogin.Modal.Body>
                        <DidaskoLogin.InputGroup className="mb-3">
                            <DidaskoLogin.FormControl
                            placeholder="First Name"
                            aria-label="fName"
                            aria-describedby="basic-addon1"
                            />
                        </DidaskoLogin.InputGroup>
                        <DidaskoLogin.InputGroup className="mb-3">
                            <DidaskoLogin.FormControl
                            placeholder="Last Name"
                            aria-label="lName"
                            aria-describedby="basic-addon1"
                            />
                        </DidaskoLogin.InputGroup>                                                
                        <DidaskoLogin.InputGroup className="mb-3">
                            <DidaskoLogin.FormControl
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />
                        </DidaskoLogin.InputGroup>
                        <DidaskoLogin.InputGroup className="mb-3">
                            <DidaskoLogin.FormControl
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            type="password"
                            />
                        </DidaskoLogin.InputGroup>
                        <DidaskoLogin.InputGroup className="mb-3">
                            <DidaskoLogin.FormControl
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            type="email"
                            />
                        </DidaskoLogin.InputGroup>
                        <DidaskoLogin.InputGroup className="mb-3">
                            <DidaskoLogin.FormControl
                            placeholder="Profile Picture"
                            aria-label="dPicture"
                            aria-describedby="basic-addon1"
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            />
                        </DidaskoLogin.InputGroup>
                    </DidaskoLogin.Modal.Body>
                    <DidaskoLogin.Modal.Footer className="text-muted justify-content-end">
                        <DidaskoLogin.Button variant="primary">Create Account</DidaskoLogin.Button>
                    </DidaskoLogin.Modal.Footer>    
            </DidaskoLogin.Modal>
        </section>
    )
}
