import { useContext } from 'react'
import '../css/Navbar.css' ;
import didaskologo from '../images/didaskologotrim.png'
import LoginButton from '../images/LoginButton.png'
import * as DidaskoNav from 'react-bootstrap';
import{ Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';


export default function Navbar() {

    const [user, setUser] = useContext(UserContext);

    return (
        <DidaskoNav.Navbar bg="light" expand="lg">
            <DidaskoNav.Container>
                <DidaskoNav.Navbar.Brand href="#home">
                <Link to="/" style={{textDecoration:'none'}}>
                <img src={didaskologo}
                width="200"
                height="15%"
                Alt="didasko"
                />
                </Link>
                </DidaskoNav.Navbar.Brand>
                <DidaskoNav.Navbar.Collapse id="basic-navbar-nav">
                    <DidaskoNav.Nav className="me-auto">
                        <Link to="/" style={{textDecoration:'none'}}>
                        <DidaskoNav.Nav.Link href="#Home">Home</DidaskoNav.Nav.Link>
                        </Link>
                        <Link to="/courses/available" style={{textDecoration:'none'}}>
                        <DidaskoNav.Nav.Link href="#AllCourses">All Courses</DidaskoNav.Nav.Link>
                        </Link>
                        <Link to="/about" style={{textDecoration:'none'}}>
                        <DidaskoNav.Nav.Link href="#About">About</DidaskoNav.Nav.Link>
                        </Link>
                        <Link to="/dashboard" style={{textDecoration:'none'}}>
                        <DidaskoNav.Nav.Link href="#MyAccount">My Account</DidaskoNav.Nav.Link>
                        </Link>
                    </DidaskoNav.Nav>
                    <DidaskoNav.Nav className="justify-content-end">
                        <DidaskoNav.Navbar.Text>
                            {!user.validated ? <Link to="/login" style={{textDecoration:'none'}}>
                            <a href="#login">
                                <img src={LoginButton}
                                width="150px"
                                height="44px"
                                alt="Login"
                                />
                            </a>
                            </Link> : <></>}
                        </DidaskoNav.Navbar.Text>
                    </DidaskoNav.Nav>
                </DidaskoNav.Navbar.Collapse>
            </DidaskoNav.Container>
        </DidaskoNav.Navbar>
    )
}
