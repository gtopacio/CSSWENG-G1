import { useContext } from 'react';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';
import { UserContext } from "../contexts/UserContext";
import { Redirect } from 'react-router-dom';

export default function ProfilePage() {

    const [user] = useContext(UserContext);

    return (
        user.refreshSent ? <h1> Loading </h1> :
        !user || !user.validated ? <Redirect to="/login" /> :
        <div>
            <Sidebar/>
            <Profile user={user}/>
        </div>
    )
}
