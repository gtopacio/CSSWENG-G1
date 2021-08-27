import { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import { Redirect, useLocation } from 'react-router';
import qs from 'qs';
import { UserContext } from '../contexts/UserContext';
import CourseCard from '../components/all_courses_page/CourseCard';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import gcashQR from '../images/gcashQR.jpg';
import paymayaQR from '../images/paymayaQR.jpg';
import { Container, Row, Col } from 'react-bootstrap';

export default function EnrollWebinar() {

    const [user, setUser] = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [webinar, setWebinar] = useState({});
    const [disabled, setDisabled] = useState(false);
    const [success, setSuccess] = useState(false);
    const [requestID, setID] = useState("");
    const [requestSent, setRequestSent] = useState(false);

    let location = useLocation();
    let webinarID = qs.parse(location.search, { ignoreQueryPrefix: true }).webinarID;

    useEffect(() => {

        async function getWebinarInfo(){
            let { data } = await axios.get("/api/public/webinar", {params: {webinarID}});
            setWebinar(data.webinar);
            let requestSent = await axios.get("/api/accounts/verifications", {params: {webinarID}});
            setRequestSent(requestSent.data.requestSent);
            setLoading(false);
        }

        if(webinarID && webinarID.trim() !== ""){
            getWebinarInfo();
        }
    }, []);

    if(!user.refreshSent && !user.validated){
        return <Redirect to="/login" />
    }

    if(!webinarID || webinarID.trim() === ""){
        return <Redirect to="/courses/available" />
    }

    async function sendEnrollmentRequest(e){
        e.preventDefault();
        setDisabled(true);
        try{
            let { data } = await axios.post("/api/webinar/enroll", {userID: user._id, webinarID});
            setSuccess(data.success);
            setID(data.requestID ? data.requestID : "");
            setDisabled(false);
        }
        catch(e){
            setSuccess(false);
            setDisabled(false);
        }
    }

    return (
        <div>
            {loading ? <h1>Loading</h1> :
            requestSent ? 
            <>
                <Navbar />
                {webinar.price <= 0 ? <><h1>You have already sent a request! Please wait for an approval. Request ID: {requestID}</h1></> :
                <>
                    <h1>You have already sent a request, please pay the amount if needed and wait for the approval.</h1>
                    <img src={gcashQR} alt = "GCash QR Code"/>
                    <img src={paymayaQR} alt="Paymaya QR Code" />
                </>
                }
            </> :
            success ? 
            <>
                <Navbar />
                {webinar.price <= 0 ? <><h1>Successfully sent a request! Please wait for the approval of your request. Request ID: {requestID}</h1></> :
                <>
                    <h1>Successfully sent a request! Please pay the amount if needed and wait for the approval. Request ID: {requestID}</h1>
                    <img src={gcashQR} alt = "GCash QR Code"/>
                    <img src={paymayaQR} alt="Paymaya QR Code" />
                </>
                }
            </>:
            <>
                <Navbar />
                <div style={{display: 'flex', justifyContent: 'center' }} className="mt-3">
                    <CourseCard webinar={webinar} showButton={false} />
                </div>
                <h1>Are you sure you want to enroll in this webinar?</h1>
                <Button variant="primary" disabled={disabled} onClick={sendEnrollmentRequest}>Yes</Button>
                <Link to="/courses/available"><Button disabled={disabled} variant="secondary">No</Button></Link>
            </>
            }
        </div>
    )
}
