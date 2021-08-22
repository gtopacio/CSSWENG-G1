import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { Redirect } from 'react-router';
import { Container, Col, Row, Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import RequestRow from '../components/enrollment_requests/RequestRow';

export default function EnrollmentRequests() {

    const [user, setUser] = useContext(UserContext);
    const [requests, setRequests] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getRequests(){
            let { data } = await axios.get("/api/admin/enrollment/requests");
            setRequests(data.requests);
            setLoading(false);
        }
        getRequests();
    }, []);

    if(!user.validated || !user.admin){
        <Redirect to="/"></Redirect>
    }

    

    return (
        <Container fluid>
            {
                loading ? <h1>Loading</h1> : 
                <>
                    <Navbar />
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
            }
        </Container>
    )
}
