import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default function TokenHandler() {

    const [user, setUser] = useContext(UserContext);
    useEffect(() => {
        async function refresh(){
            let { data } = await axios.get("/api/refresh");
            if(data.success){
                let payload = jwt_decode(data.token);
                payload.token = data.token;
                setUser(payload);
                setTimeout((14*60 + 30) * 1000, refresh);
            }
            else{
                setUser({...user, refreshSent: false});
                console.log(data.message);
            }
        }

        if(!user || !user.token || user.token.trim() === ""){
            setUser({...user, refreshSent: true});
            refresh();
        }
    }, []);

    return (
        <>
        </>
    );
}
