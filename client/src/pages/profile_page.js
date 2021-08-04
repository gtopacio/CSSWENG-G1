import {useContext, useState, useEffect} from 'react'
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';
import { UserContext } from "../contexts/UserContext";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';

export default function ProfilePage() {

    const [user, setUser] = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    console.log(user);

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
        !user || !user.token || user.token.trim() === "" ? <Redirect to="/login" /> :
        <div>
            <Sidebar/>
            <Profile user={user}/>
            <Footer/>               
        </div>
    )
}
