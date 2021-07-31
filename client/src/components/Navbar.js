import React from 'react'
import didaskologo from '../images/didaskologo.svg'
import LoginButton from '../images/LoginButton.png'

export default function Navbar() {
    return (
        <div className="nav-bar">
            <img className="didaskologo" src={didaskologo} alt="xd"></img>
                    <h1 className="place lato-normal-black-24px" style={{width: '140.12px',height: '34.78px',left: '520px',top: '28px'}}>HOME</h1>
                    <div className="all-courses lato-normal-black-24px" style={{width: '172.92px',height: '34.78px',left: '735.9px',top: '42.91px'}}>ALL COURSES</div>
                    <div className="about lato-normal-black-24px" style={{width: '172.92px',height: '34.78px',left: '1040.27px',top: '42.91px'}}>ABOUT</div>
                    <div className="my-account lato-normal-black-24px" style={{width: '172.92px',height: '34.78px',left: '1275.99px',top: '42.91px'}}>MY ACCOUNT</div>
                    <img className="loginbutton" src={LoginButton} alt="xd"></img>
        </div>
    )
}
