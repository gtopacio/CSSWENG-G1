import React from 'react'
import * as DidaskoLogin from 'react-bootstrap';
import '../css/Login.css' ;

export default function Signup() {
    return (
        <section className = "bg-container" style={{height:'83vh'}}>
            <DidaskoLogin.Card className="card shadow top-50 start-50 translate-middle" style={{maxWidth:'30em',borderRadius:'15px'}}>
                <DidaskoLogin.Card.Header style={{fontSize:"30px"}}>Sign Up</DidaskoLogin.Card.Header>
                <DidaskoLogin.Card.Body>
                <DidaskoLogin.InputGroup className="mb-3">
                    <DidaskoLogin.FormControl
                    placeholder="First Name"
                    aria-label="first_name"
                    aria-describedby="basic-addon1"
                    />
                    <DidaskoLogin.FormControl
                    placeholder="Last Name"
                    aria-label="last_name"
                    aria-describedby="basic-addon1"
                    />
                </DidaskoLogin.InputGroup>
                <DidaskoLogin.InputGroup className="mb-3">
                    <DidaskoLogin.FormControl
                    placeholder="Email"
                    aria-label="Email"
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

                <DidaskoLogin.FormControl
                    placeholder="Confirm Password"
                    aria-label="Confirm Password"
                    aria-describedby="basic-addon1"
                    type="password"
                    />
                    <DidaskoLogin.Button variant="primary">Create Account</DidaskoLogin.Button>
                </DidaskoLogin.Card.Body>
            </DidaskoLogin.Card>
        </section>
    )
}
