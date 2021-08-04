import {useContext, useState, useEffect} from 'react'
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';
import { UserContext } from "../contexts/UserContext";
import { Redirect } from 'react-router-dom';

export default function ProfilePage() {

    const [user, setUser] = useContext(UserContext);

    return (
        user.refreshSent ? <h1> Loading </h1> :
        !user || !user.token || user.token.trim() === "" && !user.refreshSent ? <Redirect to="/login" /> :
        <div>
            <Sidebar/>
            <Profile user={user}/>
            <Footer/>               
        </div>
    )
}
