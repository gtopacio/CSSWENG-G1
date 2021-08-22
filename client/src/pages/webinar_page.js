import { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import { Redirect, useLocation } from 'react-router';
import qs from 'qs';
import { UserContext } from '../contexts/UserContext';

export default function WebinarPage() {

    const [user, setUser] = useContext(UserContext);

    let location = useLocation();
    let webinarID = qs.parse(location.search, { ignoreQueryPrefix: true }).id;

    if(!user.validated){
        return <Redirect to="/login" />
    }

    if(!user.webinars && !user.webinarsTaught){
        return <Redirect to="/courses/available" />
    }

    if(!webinarID || webinarID.trim() === ""){
        return <Redirect to="/courses/available" />
    }

    if(!user.webinars || !user.webinars[webinarID]){
        if(!user.webinarsTaught || !user.webinarsTaught[webinarID])
            return <Redirect to="/courses/available" />
    }

    
    return (
        <div>
            <Navbar />
            <h1>{webinarID}</h1>
        </div>
    )
}