import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { Redirect } from 'react-router';
import { Container, Col, Row, Button } from 'react-bootstrap';
import SidebarAdmin from '../components/SidebarAdmin';
import Sidebar from '../components/Sidebar';
import RequestRow from '../components/enrollment_requests/RequestRow';

export default function EnrollmentRequests() {

    const [user, setUser] = useContext(UserContext);
    const [requests, setRequests] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getRequests(){
            if(user.admin){
                let { data } = await axios.get("/api/admin/enrollment/requests");
                setRequests(data.requests);
                setLoading(false);
            }
            else{
                let { data } = await axios.get("/api/accounts/enrollment/requests");
                setRequests(data.requests);
                setLoading(false);
            }
        }
        getRequests();
    }, []);

    if(!user.validated){
        <Redirect to="/"></Redirect>
    }

    

    return (
        <Container fluid>
            {
                loading ? <h1>Loading</h1> : 
                user.admin ? 
                <>
                    <SidebarAdmin />
                    <Row>
                        <Col>Request ID</Col>
                        <Col>Username</Col>
                        <Col>Webinar Name</Col>
                        <Col>Request Date</Col>
                        <Col></Col>
                    </Row>
                    {
                        requests.length > 0 ? 
                        requests.map((x) => { return (
                            <RequestRow request={x} />
                        )}) :
                        <Row><Col><h1>Empty</h1></Col></Row>
                    }
                </>
                :
                <>
                    <Sidebar />
                    <Row>
                        <Col>Request ID</Col>
                        <Col>Webinar Name</Col>
                        <Col>Request Date</Col>
                        <Col>Status</Col>
                        <Col>Accepted Date</Col>
                    </Row>
                    {
                        requests.length > 0 ? 
                        requests.map((x) => { console.log(x); return (
                            <Row>
                                <Col>{x.uid}</Col>
                                <Col>{x.webinarName}</Col>
                                <Col>{new Date(x.issued).toString()}</Col>
                                <Col style={{color: x.accepted ? 'green' : '#ffd500'}}>{x.accepted ? "ACCEPTED" : "PENDING"}</Col>
                                <Col>{x.accepted ? new Date(x.acceptedDate).toString() : "N/A"}</Col>
                            </Row>
                        )}) :
                        <Row><Col><h1>Empty</h1></Col></Row>
                    }
                </>
            }
        </Container>
    )
}
