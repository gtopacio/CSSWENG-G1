import { useContext } from 'react';
import Navbar from '../components/Navbar';
import Login from "../components/Login";
import { UserContext } from '../contexts/UserContext';
import { Redirect } from 'react-router';

export default function LoginPage({ history }) {

    const [user, setUser] = useContext(UserContext);

    return (
        user.refreshSent ? <h1> Loading </h1> :
        <div>
            <Navbar/>
            <Login history={history}/>
        </div>
    )
}
