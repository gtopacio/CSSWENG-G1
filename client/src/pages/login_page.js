import React from 'react';
import Navbar from '../components/Navbar';
import Login from "../components/Login";

export default function LoginPage({history}) {
    return (
        <div>
            <Navbar/>
            <Login history={history}/>
        </div>
    )
}
