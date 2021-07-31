import React from 'react'
import {Card, CardText, CardBody, CardTitle, CardSubtitle, CardImg} from 'react-bootstrap';


export default function Login() {
    return (
        <div className='Login' style={{ width: '628px',height: '277px',left: '646px',top: '402px'}}>
            <div className='Login-Container' style={{ width: '628px',height: '277px',left: '646px',top: '402px'}}>
                <div className="mb-3">           
                    <input
                    type= "text"
                    className="form-control p-2"
                    id= "LoginUsername"
                    placeholder= "Username"
                    name= "uName">
                    </input>
                </div>
                <div className="mb-3">         
                    <input
                    type= "password"
                    className="form-control p-2"
                    id= "LoginPassword"
                    placeholder= "Password"
                    name= "uPassword">
                    </input>
                </div>
            </div>
        </div>
    )
}
