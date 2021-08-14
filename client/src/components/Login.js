import React from 'react'
import * as DidaskoLogin from 'react-bootstrap';
import '../css/Login.css' ;
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Redirect } from 'react-router';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Signup_success from './Signup_success';

export default function Login(props) {

    const [user, setUser] = useContext(UserContext);
    const [show, setShow] = useState(false);
    const [loginInputs, setLoginInputs] = useState({});
    const [signupInputs, setSignupInputs] = useState({});
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    /*
        1. Create these states. The states store stuff whenever the page loads in
        2. Error component needs a flag and a message. Handle the stuff inside the Handlers methods with the error states
        3. Class states needs to 
    */

    // we set these thigns to empty string so that it doesn't display any class Divs.
    let textfieldDivs=
    {
        //show red for both login forms because any of them can be wrong
        userpassError: "",


        //each individual forms. processing it in the signupHandler needs to check each of these fields and set it to "errorDiv"
        usernameError: "",
        firstnameError: "",
        lastnameError: "",
        passwordError: "",
        emailError: ""
    }
    const [errorDivs, setErrorDivs] = useState(textfieldDivs)

    if(user && user.token && user.token.trim() !== ""){
        return <Redirect to="/dashboard" />
    }

    const signUpClose = () => setShow(false);
    const signUpShow = () => setShow(true);

    const loginHandler = async(e) => {
        e.preventDefault();
        let res = await axios.post("/api/login", loginInputs);
        let { data } = res
        if(data.success){
            // remove the div classname here to remove the thigny


            let payload = jwt_decode(data.token);
            payload.token = data.token;
            setUser(payload);
            props.history.push("/dashboard");
        }
        else{

            //if theres an error, process the class to have the div nameoh m
            let copy = errorDivs;
            copy.logginError = "fieldError"
            setErrorDivs(copy);
            console.log(data.errors + "data errors");
        }
    };

    const signupHandler = async(e) => {
        e.preventDefault();
        let formData = new FormData();  
        for(let key in signupInputs){
            if(signupInputs.hasOwnProperty(key) && key !== "profilePicture"){
                formData.append(key, signupInputs[key]);
            }
        }
        formData.append("profilePicture", signupInputs.profilePicture[0]);
        try{
            let { data } = await axios.post("/api/signup", formData, {headers: {"Content-Type": "multipart/form-data"}});
            if(data.success){
                setSignUpSuccess(true);
            }
            else{

                console.log(data.errors + " data errors");
            }
        }
        catch(e){
            /* for all elements in the e.rosponse.data, check the field name and assign it to xC 
            
            
            */
            let copy = errorDivs;
            // make copy of the state, then set State
            copy.usernameError= "";
            copy.passwordError = "";   
            copy.firstnameError = "";
            copy.lastnameError = "";
            copy.emailError = "";
            
            
            for(let key in e.response.data.errors)
                if(e.response.data.errors.hasOwnProperty(key))
                {
                    console.log(typeof(key) + " KEY HERE");

                    if(key === "userName")
                    {
                        console.log("entered username");
                        copy.usernameError= "fieldError";
                    }
                    else
                    if(key === "password")
                        copy.passwordError = "fieldError";   
                    else
                    if(key === "firstName")
                        copy.firstnameError = "fieldError";
                    else
                    if(key === "lastName")
                        copy.lastnameError = "fieldError";
                    else
                    if(key === "email")
                        copy.emailError = "fieldError";

                }

                console.log(JSON.stringify(copy) + " this is copy");
            setErrorDivs(copy);
        }
        
                

    };

    return (
        signUpSuccess ? <Signup_success /> :
        <section className = "bg-container" style={{height:'83vh'}}>
            <DidaskoLogin.Card className="card shadow top-50 start-50 translate-middle" style={{maxWidth:'30em',borderRadius:'15px'}}>
                <DidaskoLogin.Card.Header style={{fontSize:"30px"}}>Login</DidaskoLogin.Card.Header>
                <DidaskoLogin.Card.Body>
                <DidaskoLogin.InputGroup className="mb-3 fieldError">
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
                            className={`${errorDivs.firstnameError}`}
                            onChange={(e) => {
                                let copy = signupInputs;
                                copy.firstName = e.target.value;
                                setSignupInputs(copy);
                            }}
                            />
                        </DidaskoLogin.InputGroup>
                        <DidaskoLogin.InputGroup className="mb-3 fieldError">
                            <DidaskoLogin.FormControl
                            placeholder="Last Name"
                            aria-label="lName"
                            aria-describedby="basic-addon1"
                            className={`${errorDivs.lastnameError}`}
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
                            className={`${errorDivs.usernameError}`}

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
                            className="fieldError"
                            onChange={(e) => {
                                let copy = signupInputs;
                                copy.password = e.target.value;
                                setSignupInputs(copy);
                            }}
                            />
                        </DidaskoLogin.InputGroup>
                        <DidaskoLogin.InputGroup className="mb-3">
                            <DidaskoLogin.FormControl
                            placeholder="Re-Enter Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            type="password"
                            className={`${errorDivs.passwordError}`}
                            />
                        </DidaskoLogin.InputGroup>
                        <DidaskoLogin.InputGroup className="mb-3">
                            <DidaskoLogin.FormControl
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            type="email"
                            className={`${errorDivs.emailError}`}
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
                            onChange={(e) => {
                                let copy = signupInputs;
                                copy.profilePicture = e.target.files;
                                setSignupInputs(copy);
                            }}
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
