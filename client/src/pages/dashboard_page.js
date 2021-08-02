import {useContext, useEffect, useState} from 'react';
import MyAccount from '../components/MyAccount';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar'
import { UserContext } from '../contexts/UserContext';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default function DashboardPage(props) {

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
        !user || !user.token || user.token.trim() === "" ? <Redirect to="/login" /> :
        <div>
            <Sidebar/>
            <MyAccount user={user}/>
            <Footer />
        </div>
    )
}
