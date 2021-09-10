import {useContext, useEffect, useState} from 'react';
import MyAccount from '../components/MyAccount';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import SidebarAdmin from '../components/SidebarAdmin';
import { UserContext } from '../contexts/UserContext';
import { Redirect } from 'react-router-dom';

export default function DashboardPage(props) {

    const [user, setUser] = useContext(UserContext);

    return (
        user.refreshSent ? <h1> Loading </h1> :
        !user.validated && !user.refreshSent ? <Redirect to="/login" /> :
        <div>
            <Sidebar/>
            <MyAccount user={user}/>
            <Footer />
        </div>
    )
}
