import React from 'react'
import defaultdp from "../images/defaultdp.jpg";
import '../css/Profile.css' ;
import * as DidaskoProfile from 'react-bootstrap';
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function Profile(props) {

    const [user, setUser] = useContext(UserContext);
    const [show, setShow] = useState(false);


    const signUpClose = () => setShow(false);
    const signUpShow = () => setShow(true);



    const dp = !user || !user.profilePicture || user.profilePicture.trim() === "" ? defaultdp : `https://drive.google.com/uc?id=${user.profilePicture}`;
    return (
        <section className="custom-section" style={{minHeight:'90vh'}}>
            <div className="container d-flex align-items-center justify-content-center" style={{minHeight:'inherit'}}> 
                <div className="row">
                    <div className="col-12 mx-auto text-center">
                        <img src={dp} className="mx-auto btn dropdown-toggle displayPicture text-center" id="displayPictureDropdown" title="displayPicture" alt="displayPicture" data-bs-toggle="dropdown" />
                    </div>
                    <div className="col d-flex justify-content-center">  
                    </div>
                    <div className="col-12 mx-auto pt-2">
                        <p style={{textAlign:'center',fontSize:'30pt',fontWeight:'400', marginBottom:'-0.4em'}}>
                            {`${user.firstName} ${user.lastName}`}
                        </p>
                        <p></p>
                        <p style={{textAlign:'center',fontSize:'12pt',fontWeight:'400', marginBottom:'-0.4em'}}>
                            Hi, this is sample text, good show
                        </p>
                        <p></p>
                        <DidaskoProfile.Button 
                        variant="link"
                        onClick={signUpShow}
                        variant="primary" 
                        size = "lg"> Edit Profile </DidaskoProfile.Button>
                    </div>
                </div>
            </div>

            <DidaskoProfile.Modal show={show} onHide={signUpClose} aria-labelledby="contained-modal-title-vcenter" centered>
                    <DidaskoProfile.Modal.Header closeButton>
                        <DidaskoProfile.Modal.Title id="contained-modal-title-vcenter">
                            Edit Profile
                        </DidaskoProfile.Modal.Title>
                    </DidaskoProfile.Modal.Header>
                    <DidaskoProfile.Modal.Body>
                        <DidaskoProfile.InputGroup className="mb-3">
                            <DidaskoProfile.FormControl
                            placeholder="First Name"
                            aria-label="fName"
                            aria-describedby="basic-addon1"
                            readOnly
                            />
                        </DidaskoProfile.InputGroup>
                        <DidaskoProfile.InputGroup className="mb-3">
                            <DidaskoProfile.FormControl
                            placeholder="Last Name"
                            aria-label="lName"
                            aria-describedby="basic-addon1"
                            readOnly
                            />
                        </DidaskoProfile.InputGroup>                                                
                        <DidaskoProfile.InputGroup className="mb-3">
                            <DidaskoProfile.FormControl
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            readOnly
                            />
                        </DidaskoProfile.InputGroup>
                        <DidaskoProfile.InputGroup className="mb-3">
                            <DidaskoProfile.FormControl
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            type="password"
                            />
                        </DidaskoProfile.InputGroup>
                        <DidaskoProfile.InputGroup className="mb-3">
                            <DidaskoProfile.FormControl
                            placeholder="Re-Enter Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            type="password"
                            />
                        </DidaskoProfile.InputGroup>
                        <DidaskoProfile.InputGroup className="mb-3">
                            <DidaskoProfile.FormControl
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            type="email"
                            readOnly
                            />
                        </DidaskoProfile.InputGroup>
                        <DidaskoProfile.InputGroup className="mb-3">
                            <DidaskoProfile.FormControl
                            placeholder="Profile Picture"
                            aria-label="dPicture"
                            aria-describedby="basic-addon1"
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            />
                        </DidaskoProfile.InputGroup>
                        <DidaskoProfile.InputGroup className="mb-3">
                            <DidaskoProfile.FormControl
                            placeholder="Bio"
                            as="textarea"
                            row={3}
                            aria-describedby="basic-addon1"
                            />
                        </DidaskoProfile.InputGroup>
                    </DidaskoProfile.Modal.Body>
                    <DidaskoProfile.Modal.Footer className="text-muted justify-content-end">
                        <DidaskoProfile.Button variant="primary" onClick="">Save Changes</DidaskoProfile.Button>
                    </DidaskoProfile.Modal.Footer>    
            </DidaskoProfile.Modal>
        </section>
    )
}
