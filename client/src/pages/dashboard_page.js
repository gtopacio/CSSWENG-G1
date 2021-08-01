import React, {useContext} from 'react';
import MyAccount from '../components/MyAccount';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar'
import { UserContext } from '../contexts/UserContext';
import { Redirect } from 'react-router';

export default function DashboardPage() {

    const [user, setUser] = useContext(UserContext);

    if(!user || !user.token || user.token.trim() == ""){
        return <Redirect to="/login" />
    }

    return (
        <div>
            <Sidebar/>
            <MyAccount />
            <Footer />
        </div>
    )
}
