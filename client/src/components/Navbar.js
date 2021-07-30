import React from 'react'
import didaskologo from '../images/didaskologo.svg'
import LoginButton from '../images/LoginButton.png'

export default function Navbar() {
    return (
        <div className="nav-bar">
            <img className="didaskologo" src={didaskologo}></img>
                <div className="links">
                    <h1 className="place lato-normal-black-24px">HOME</h1>
                    <div className="all-courses lato-normal-black-24px">ALL COURSES</div>
                    <div className="about lato-normal-black-24px">ABOUT</div>
                    <div className="my-account lato-normal-black-24px">MY ACCOUNT</div>
                    <img className="loginbutton" src={LoginButton}></img>
                </div>
        </div>
    )
}
