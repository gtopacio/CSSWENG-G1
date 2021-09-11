import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function SearchBar({setInput, assignTeacher}) {
    return (
        <Container className="p-5" style={{backgroundColor: "#1A1846"}}>
            <Row style={{textAlign: "left"}}>
                {   assignTeacher ? <p style={{color: "white"}}>Search for a webinar.</p> : 
                    <div>
                        <h3 style={{color: "white"}}>Start your learning journey with Didasko!</h3>
                        <p style={{color: "white"}}>Search for a webinar.</p>
                    </div>
                }
            </Row>
            <Row>
                <Col xs={10}>
                <FloatingLabel
                            controlId="floatingInput"
                            label="Search for a webinar here"
                            className="align-items-center justify-content-md-center"
                        >
                    <Form.Control type="text" placeholder=""
                    onChange = {(e) => {
                        setInput(e.target.value);
                    }}/>
                    </FloatingLabel>
                </Col>
            </Row>
        </Container>
    )
}
