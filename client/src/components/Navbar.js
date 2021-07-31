import React from 'react'
import didaskologo from '../images/didaskologo.png'
import LoginButton from '../images/LoginButton.png'
import * as DidaskoNav from 'react-bootstrap';


export default function Navbar() {
    return (
        <DidaskoNav.Navbar bg="light" expand="lg">
            <DidaskoNav.Container>
                <DidaskoNav.Navbar.Brand href="#home">
                <img src={didaskologo}
                width="200"
                height="100px"
                Alt="didasko"
                />
                </DidaskoNav.Navbar.Brand>
                <DidaskoNav.Navbar.Collapse id="basic-navbar-nav">
                    <DidaskoNav.Nav className="me-auto">
                        <DidaskoNav.Nav.Link href="#home">Home</DidaskoNav.Nav.Link>
                        <DidaskoNav.Nav.Link href="#link">Link</DidaskoNav.Nav.Link>
                        <DidaskoNav.NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <DidaskoNav.NavDropdown.Item href="#action/3.1">Action</DidaskoNav.NavDropdown.Item>
                        <DidaskoNav.NavDropdown.Item href="#action/3.2">Another action</DidaskoNav.NavDropdown.Item>
                        <DidaskoNav.NavDropdown.Item href="#action/3.3">Something</DidaskoNav.NavDropdown.Item>
                        <DidaskoNav.NavDropdown.Divider />
                        <DidaskoNav.NavDropdown.Item href="#action/3.4">Separated link</DidaskoNav.NavDropdown.Item>
                        </DidaskoNav.NavDropdown>
                    </DidaskoNav.Nav>
                    <DidaskoNav.Nav className="justify-content-end">
                        <DidaskoNav.Navbar.Text>
                            <a href="#login">
                                <img src={LoginButton}
                                width="150px"
                                height="44px"
                                alt="Login"
                                />
                            </a>
                        </DidaskoNav.Navbar.Text>
                    </DidaskoNav.Nav>
                </DidaskoNav.Navbar.Collapse>
            </DidaskoNav.Container>
        </DidaskoNav.Navbar>
    )
}
