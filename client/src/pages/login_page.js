import { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import Login from "../components/Login";
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default function LoginPage({ history }) {

    const [user, setUser] = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function refresh(){
            let { data } = await axios.get("/api/refresh");
            if(data.success){
                let payload = jwt_decode(data.token);
                payload.token = data.token;
                setUser(payload);
            }
            else{
                console.log(data.message);
            }
            setLoading(false);
        }

        if(!user || !user.token || user.token.trim() === ""){
            refresh();
        }
        else{
            setLoading(false);
        }
    }, []);

    return (
        loading ? <h1> Loading </h1> : 
        <div>
            <Navbar/>
            <Login history={history}/>
        </div>
    )
}
