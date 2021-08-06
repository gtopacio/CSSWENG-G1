import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import axios from 'axios';

export default function UserVerificationPage(props) {

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        const uid = props.match.params.id;
        async function verify(){
            try{
                let {data} = await axios.post('/api/verify', { uid });
                setSuccess(data.success);
            }
            catch(e){
                setSuccess(false);
            }
            setLoading(false);
        }
        verify();
    }, []);

    return (
            loading ? <h1>Loading</h1> :
            success ? 
            <div>
                <Navbar/>
                <h1>Verification Successful, You can now login</h1>
            </div>
                 :
            <h1>Verification Not Successful</h1>
    )
}
