import { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

export default function Recent({user}) {

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
            <Row className="mb-2">
                <h3 style={{textAlign: "left"}}>Recent Webinars</h3>
            </Row>
            <Row>
                {loading ? <h1>Loading</h1>:
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
