import CourseCard from './CourseCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export default function SearchResults({webinars, loading}) {

    return (
        <Container className="p-5">
            <Row className="mb-2">
                <h3 style={{textAlign: "left"}}>Search Results</h3>
            </Row>
            <Row>
                {loading ? <h1>Loading</h1>:
                    webinars.length <= 0 ? <h1>Empty</h1> :
                    webinars.map(x => {
                        return (<Col className="mb-3" xs={3}>
                                <CourseCard webinar={x} />
                                </Col>);
                    })
                }
            </Row>
        </Container>
    )
}
