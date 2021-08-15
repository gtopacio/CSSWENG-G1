import React from 'react'
import * as DidaskoZoomStu from 'react-bootstrap';
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function Zoom() {
    const [user, setUser] = useContext(UserContext);
    const [show, setShow] = useState(false);


    const signUpClose = () => setShow(false);
    const signUpShow = () => setShow(true);

    return (
        <section className="custom-section" style={{minHeight:'90vh'}}>
            <div className="mb-3">
            </div>
            <div className="container pt-4" style={{maxWidth:'1320px',minHeight:'100px'}}>
                <div className="row">
                    <div className="card mb-3 mx-auto" style={{paddingRight:'0'}}>
                        <div className="row g-2" style={{minHeight:'inherit',display:'flex'}}>
                            <div className="row g-3" style={{minHeight:'inherit',display:'flex'}}>
                                <h4>Webinar: Testing 123 </h4>
                            </div>
                            <p>Professor: Professor Ballsack</p>
                            <div className="mb-3 col-12">
                            <DidaskoZoomStu.Button href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" disabled>Join</DidaskoZoomStu.Button>
                            <DidaskoZoomStu.Button href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Register</DidaskoZoomStu.Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
