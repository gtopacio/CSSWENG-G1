import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { Redirect } from 'react-router';
import { Container, Table } from 'react-bootstrap';
import SidebarAdmin from '../components/SidebarAdmin';
import Sidebar from '../components/Sidebar';
import RequestRow from '../components/enrollment_requests/RequestRow';
import '../css/EnrollmentRequests.css';

export default function EnrollmentRequests() {

    const [user] = useContext(UserContext);
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
                                {requests.length > 0 ? 
                                requests.map((x) => { return (
                                    <RequestRow request={x} />
                                )}) :
                                <tr><td><h1>Empty</h1></td></tr>}
                            </tbody>

                        </Table>
                    </>
                    :
                    <>
                        <Sidebar />
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
                                {requests.length > 0 ? 
                                requests.map((x) => { return (
                                    <tr>
                                        <td>{x.uid}</td>
                                        <td>{x.webinarName}</td>
                                        <td>{new Date(x.issued).toString()}</td>
                                        <td style={{color: x.accepted ? 'green' : '#ffd500'}}>{x.accepted ? "ACCEPTED" : "PENDING"}</td>
                                        <td>{x.accepted ? new Date(x.acceptedDate).toString() : "N/A"}</td>
                                    </tr>
                                )}) :
                                <tr><td><h1>Empty</h1></td></tr>}
                            </tbody>

                        </Table>
                    </>
                }
            </Container>
        
    )
}
