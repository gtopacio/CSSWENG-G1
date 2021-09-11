import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Redirect, useLocation } from 'react-router';
import qs from 'qs';
import { UserContext } from '../contexts/UserContext';
import CourseLayout from '../components/CourseLayout';
import axios from 'axios';

export default function WebinarPage() {

    const [user] = useContext(UserContext);
    const [webinar, setWebinar] = useState({});

    let location = useLocation();
    let webinarID = qs.parse(location.search, { ignoreQueryPrefix: true }).id;

    useEffect(() => {
        if(!user.validated){
            return <Redirect to="/login" />
        }
    
        if(!user.webinars && !user.webinarsTaught){
            return <Redirect to="/courses/available" />
        }
    
        if(!webinarID || webinarID.trim() === ""){
            return <Redirect to="/courses/available" />
        }
    
        if(!user.webinars || !user.webinars[webinarID]){
            if(!user.webinarsTaught || !user.webinarsTaught[webinarID])
                return <Redirect to="/courses/available" />
        }
    }, [user])

    useEffect(() => {
        async function getWebinar(){
            let { data } = await axios.get("/api/webinar", {params: {webinarID}});
            if(data.success){
                setWebinar(data.webinar);
            }
        }

        getWebinar();
    }, []);

    
    return (
        <div>
            <Navbar />
            <h1>{webinarID}</h1>
            <CourseLayout webinar = {webinar} user = {user}/>
        </div>
    )
}
