import { useContext } from 'react';
import Navbar from '../components/Navbar';
import Login from "../components/Login";
import { UserContext } from '../contexts/UserContext';

export default function LoginPage({ history }) {

    const [user] = useContext(UserContext);

    return (
        user.refreshSent ? <h1> Loading </h1> :
        <div>
            <Navbar/>
            <Login history={history}/>
        </div>
    )
}
