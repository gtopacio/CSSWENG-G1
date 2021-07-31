import React from 'react'
import didaskologo from '../images/didaskologo.png'
import LoginButton from '../images/LoginButton.png'
import * as DidaskoNav from 'react-bootstrap';
import{
    BrowserRouter as Router,
    Link
} from 'react-router-dom'


export default function Navbar() {
    return (
        <DidaskoNav.Navbar bg="light" expand="lg">
            <DidaskoNav.Container>
                <DidaskoNav.Navbar.Brand href="#home">
                <Link to="/Home">
                <img src={didaskologo}
                width="200"
                height="100px"
                Alt="didasko"
                />
                </Link>
                </DidaskoNav.Navbar.Brand>
                <DidaskoNav.Navbar.Collapse id="basic-navbar-nav">
                    <DidaskoNav.Nav className="me-auto">
                        <Link to="/Home">
                        <DidaskoNav.Nav.Link href="#Home">Home</DidaskoNav.Nav.Link>
                        </Link>
                        <Link to="/AllCourses">
                        <DidaskoNav.Nav.Link href="#AllCourses">All Courses</DidaskoNav.Nav.Link>
                        </Link>
                        <Link to="/About">
                        <DidaskoNav.Nav.Link href="#About">About</DidaskoNav.Nav.Link>
                        </Link>
                        <Link to="/MyAccount">
                        <DidaskoNav.Nav.Link href="#MyAccount">My Account</DidaskoNav.Nav.Link>
                        </Link>
                    </DidaskoNav.Nav>
                    <DidaskoNav.Nav className="justify-content-end">
                        <DidaskoNav.Navbar.Text>
                            <Link to="/Login">
                            <a href="#login">
                                <img src={LoginButton}
                                width="150px"
                                height="44px"
                                alt="Login"
                                />
                            </a>
                            </Link>
                        </DidaskoNav.Navbar.Text>
                    </DidaskoNav.Nav>
                </DidaskoNav.Navbar.Collapse>
            </DidaskoNav.Container>
        </DidaskoNav.Navbar>
    )
}
