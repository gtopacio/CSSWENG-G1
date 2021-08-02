import React from 'react'
import * as DidaskoLogin from 'react-bootstrap';
import '../css/Login.css' ;
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Redirect } from 'react-router';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default function Login(props) {

    const [user, setUser] = useContext(UserContext);
    const [show, setShow] = useState(false);
    const [loginInputs, setLoginInputs] = useState({});
    const [signupInputs, setSignupInputs] = useState({});

    if(user && user.token && user.token.trim() !== ""){
        return <Redirect to="/dashboard" />
    }

    const signUpClose = () => setShow(false);
    const signUpShow = () => setShow(true);

    const loginHandler = async(e) => {
        e.preventDefault();
        let res = await axios.post("/api/login", loginInputs);
        console.log(res);
        let { data } = res
        if(data.success){
            let payload = jwt_decode(data.token);
            payload.token = data.token;
            setUser(payload);
            props.history.push("/dashboard");
        }
        else{
            console.log(data.message);
        }
    };

    const signupHandler = async(e) => {
        e.preventDefault();
        let { data } = await axios.post("/api/signup", signupInputs);
        if(data.success){
            let payload = jwt_decode(data.token);
            payload.token = data.token;
            setUser(payload);
            props.history.push("/dashboard");
        }
        else{
            console.log(data.message);
        }
    };

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
                    onChange={(e) => {
                        let copy = loginInputs;
                        copy.userName = e.target.value;
                        setLoginInputs(copy);
                    }}
                    />
                </DidaskoLogin.InputGroup>
                <DidaskoLogin.InputGroup className="mb-3">
                    <DidaskoLogin.FormControl
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    type="password"
                    onChange={(e) => {
                        let copy = loginInputs;
                        copy.password = e.target.value;
                        setLoginInputs(copy);
                    }}
                    />
                </DidaskoLogin.InputGroup>
                    <DidaskoLogin.Button variant="primary" onClick={loginHandler}>Login</DidaskoLogin.Button>
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
                            onChange={(e) => {
                                let copy = signupInputs;
                                copy.firstName = e.target.value;
                                setSignupInputs(copy);
                            }}
                            />
                        </DidaskoLogin.InputGroup>
                        <DidaskoLogin.InputGroup className="mb-3">
                            <DidaskoLogin.FormControl
                            placeholder="Last Name"
                            aria-label="lName"
                            aria-describedby="basic-addon1"
                            onChange={(e) => {
                                let copy = signupInputs;
                                copy.lastName = e.target.value;
                                setSignupInputs(copy);
                            }}
                            />
                        </DidaskoLogin.InputGroup>                                                
                        <DidaskoLogin.InputGroup className="mb-3">
                            <DidaskoLogin.FormControl
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(e) => {
                                let copy = signupInputs;
                                copy.userName = e.target.value;
                                setSignupInputs(copy);
                            }}
                            />
                        </DidaskoLogin.InputGroup>
                        <DidaskoLogin.InputGroup className="mb-3">
                            <DidaskoLogin.FormControl
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            type="password"
                            onChange={(e) => {
                                let copy = signupInputs;
                                copy.password = e.target.value;
                                setSignupInputs(copy);
                            }}
                            />
                        </DidaskoLogin.InputGroup>
                        <DidaskoLogin.InputGroup className="mb-3">
                            <DidaskoLogin.FormControl
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            type="email"
                            onChange={(e) => {
                                let copy = signupInputs;
                                copy.email = e.target.value;
                                setSignupInputs(copy);
                            }}
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
                        <DidaskoLogin.Button variant="primary" onClick={signupHandler}>Create Account</DidaskoLogin.Button>
                    </DidaskoLogin.Modal.Footer>    
            </DidaskoLogin.Modal>
        </section>
    )
}
