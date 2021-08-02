import {useState, useContext, useEffect} from 'react';
import { UserContext } from '../contexts/UserContext';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default function LogoutPage() {

    const [loggingOut, setLoggingOut] = useState(true);
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        setUser({
            userName: "",
            email: "",
            firstName: "",
            lastName: "",
            admin: false,
            token: ""
        });
        async function logout(){
            let {data} = await axios.post("/api/logout");
            if(data.success){
                setLoggingOut(false);
            }
        }
        logout();
    }, []);

    return (
        loggingOut? <h1> Logging Out </h1> : <Redirect to="/" />
    )
}
