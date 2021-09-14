import { Card, Form, FormControl, Button, Modal, InputGroup} from 'react-bootstrap';
import '../css/Login.css' ;
import '../css/Global.css' ;
import '../css/Buttons.css' ;
import { useState, useContext} from 'react';
import { UserContext } from '../contexts/UserContext';
import { Redirect } from 'react-router';
import axios from 'axios';
import {io} from 'socket.io-client';
import { ErrorContext } from '../contexts/ErrorContext';
import SignupForm from './login_page/SignupForm';

export default function Login(props) {

    const [user, setUser] = useContext(UserContext);
    const [show, setShow] = useState(false);
    const [loginInputs, setLoginInputs] = useState({
        userName: '',
        password: ''
    });
    const [errors, setErrors] = useContext(ErrorContext);
    const [touched, setTouched] = useState({userName: false, password: false});

    if(user.validated){
        return <Redirect to="/dashboard" />
    }

    const signUpClose = () => setShow(false);
    const signUpShow = () => setShow(true);

    const loginHandler = async(e) => {
        e.preventDefault();
        if(loginInputs.userName.trim() === "" || loginInputs.password.trim() === ""){
            setTouched({
                userName: loginInputs.userName.trim() === "",
                password: loginInputs.password.trim() === ""
            });
            return;
        }

        try{
            let { data } = await axios.post("/api/login", loginInputs);
            if(data.success){
                let newUser = {...data.user, refreshSent: false, validated: true}
                newUser.socket = io();
                newUser.socket.emit("join room", newUser._id);
                setUser(newUser);   
                props.history.push("/dashboard");
            }
            else{
                setErrors({show: true, msg:data.errors, title:"Errors"});
            }
        }
        catch(e){
            console.log(e);
            setErrors({show: true, msg:e.response.data.errors, title:"Errors"});
        }
    };

    return (
        <section className = "bg-container" style={{height:'93vh',backgroundSize:'cover',backgroundRepeat: 'no-repeat'}}>
            <Card className="card add shadow top-50 start-50 translate-middle" style={{maxWidth:'30em',maxHeight:'23em'}}>
                <Card.Header style={{fontSize:"30px",backgroundColor:'white'}}>Login</Card.Header>
                <Card.Body style={{fontSize:"30px",backgroundColor:'white'}}>
                    <Form noValidate onSubmit={loginHandler}>
                    <h4 className="fw-bold" style={{textAlign: "left",color:'black'}}>Username</h4>
                        <InputGroup hasValidation className="mb-3">
                            <FormControl
                            required
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            isInvalid = {touched.userName && !loginInputs.userName}
                            onChange={(e) => {
                                setLoginInputs({...loginInputs, userName: e.target.value});
                                setTouched({...touched, userName: loginInputs.userName.trim() === ""})
                            }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please input your username.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <h4 className="fw-bold" style={{textAlign: "left",color:'black'}}>Password</h4>
                        <InputGroup hasValidation className="mb-3">
                            <FormControl
                            required
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            type="password"
                            isInvalid = {touched.password && !loginInputs.password}
                            onChange={(e) => {
                                setLoginInputs({...loginInputs, password: e.target.value});
                                setTouched({...touched, password: loginInputs.password.trim() === ""})
                            }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please input your password.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <Button type="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-muted">
                <div>  
                    <p className="mt-0 mb-1" style={{fontSize:'11pt'}}>
                        Don't have an account?
                        <Button
                        variant="link"
                        onClick={signUpShow}
                        style={{boxShadow: 'none',textDecoration:'none',padding:'0px',fontSize:'11pt'}}> Sign up here!</Button>
                    </p>
                </div>  
                </Card.Footer>
            </Card>

            <Modal show={show} onHide={signUpClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sign Up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SignupForm />
                </Modal.Body>
            </Modal>
        </section>
    )
}
