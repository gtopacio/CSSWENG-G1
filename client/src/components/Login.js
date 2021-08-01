import React from 'react'
import * as DidaskoLogin from 'react-bootstrap';
import '../css/Login.css' ;

export default function Login() {
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
                    Don't have an account? 
                    <DidaskoLogin.Nav.Link href="/signup">Sign up here!</DidaskoLogin.Nav.Link>
                    
                </DidaskoLogin.Card.Footer>
            </DidaskoLogin.Card>
        </section>
    )
}
