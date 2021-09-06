import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { Redirect } from 'react-router';
import { Container, Col, Row, Button, Table } from 'react-bootstrap';
import SidebarAdmin from '../components/SidebarAdmin';
import Sidebar from '../components/Sidebar';
import RequestRow from '../components/enrollment_requests/RequestRow';
import '../css/EnrollmentRequests.css';

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
                        <div className="mb-5"></div>
                        <Table id="requests" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Request ID</th>
                                    <th>Username</th>
                                    <th>Webinar Name</th>
                                    <th>Request Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>*Insert ID here*</td>
                                    <td>*Insert UN here*</td>
                                    <td>*Insert WN here*</td>
                                    <td>*Insert RD here*</td>
                                    <td>*Insert Status here*</td>
                                </tr>
                            </tbody>

                        </Table>

                        <Row>
                        <div className="mb-5">
                        </div>
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
                        <div className="mb-5"></div>
                        <Table id="requests" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Request ID</th>
                                    <th>Webinar Name</th>
                                    <th>Request Date</th>
                                    <th>Status</th>
                                    <th>Accepted Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>*Insert ID here*</td>
                                    <td>*Insert Webinar Name here*</td>
                                    <td>*Insert Request Date here*</td>
                                    <td>*Insert Status here*</td>
                                    <td>*Insert Accepted Date here*</td>
                                </tr>
                            </tbody>

                        </Table>
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
