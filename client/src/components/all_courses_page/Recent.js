import { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import AssignBlock from '../AssignBlock';
import axios from 'axios';

export default function Recent({user, assignTeacher}) {

    const [webinars, setWebinars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getRecent(){
            let { data } = await axios.get("/api/public/webinar/recent");
            setWebinars(data.webinars);
            setLoading(false);
        }

        getRecent();
    }, []);

    return (
        <Container className="p-5">
            {
                assignTeacher ? 
                    <div></div> :
                    <Row className="mb-2">
                        <h2 className="fw-bold" style={{textAlign: "left"}}>Recent Webinars</h2>
                    </Row>
            }
            <Row>
                {
                    /*
                        If an admin is assigning, load up all the Course Cards with Assign
                    */
                    assignTeacher ? 
                    loading ? <h1>Loading</h1>:
                        webinars.length <= 0 ? <h1>Empty</h1> :
                        webinars.map(x => {
                            return (<Col className="mb-3 col-3" key={x._id}>
                                    <AssignBlock webinar={x}/>
                                    </Col>);
                        })
                    
                    :
                    loading ? <h1>Loading</h1>:
                        webinars.length <= 0 ? <h1>Empty</h1> :
                        webinars.map(x => {
                            return (<Col className="mb-3 col-3" key={x._id}>
                                    <CourseCard webinar={x} user={user} />
                                    </Col>);
                        })
                    
                }
            </Row>
        </Container>
    )
}
