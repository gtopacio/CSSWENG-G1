import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';

export default function TokenHandler() {

    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        async function refresh(){
            try{
                let { data } = await axios.get("/api/refresh");
                if(data.success){
                    let user = {...data.user, refreshSent: false, validated: true}
                    setUser(user);
                }
                else{
                    setUser({refreshSent: false});
                    console.log("Invalid Session");
                }
            }
            catch(e){
                setUser({refreshSent: false});
                console.log("Invalid Session");
            }
        }
        refresh();
    }, []);

    return (
        <>
        </>
    );
}
