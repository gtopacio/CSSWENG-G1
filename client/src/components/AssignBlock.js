import { useState, useEffect } from 'react';
import { Card, Row, Container, Modal, InputGroup, FormControl, Button } from 'react-bootstrap';
import image10 from "../images/image10.jpg";
import AssignTeacherBlock from './AssignTeacherBlock';
import axios from 'axios';
import { ErrorProvider } from '../contexts/ErrorContext';

export default function AssignBlock({ webinar }) {

    const signUpShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const signUpClose = () => setShow(false);
    const [searchInputs, setSearchInputs] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [touched, setTouched] = useState(false);
    const [professors, setProfessors] = useState([]);
    
    let { name, teachers } = webinar;

    const handleSearch = async() => {
        try{
            let { data } = await axios.get("/api/admin/users", {params: searchInputs});
            setSearchResults(data);
            setTouched(true);
        }
        catch(e){
            setTouched(true);
            setSearchResults([]);
        }
    }

    useEffect(() => {
        async function getTeachers(){
            let promises = [];
            for(let x in teachers){
                promises.push(axios.get("/api/public/user", {params: {_id: x}}));
            }
            promises = await Promise.all(promises);
            setProfessors(promises.map((x) => {
                let { data } = x;
                return `${data.user.firstName} ${data.user.lastName}`;
            }));
        }
        getTeachers();
    }, [webinar]);

    return (
        <div>
            <Card style={{width: '24rem',height: '14rem'}}>
                <Card.Img variant="top" src={webinar.bannerLink ? webinar.bannerLink : image10}
                    style={{background: 'linear-gradient(180deg, rgba(17, 17, 17, 0.4) 0%, rgba(17, 17, 17, 0.72) 93.75%);'}}
                />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        <Container>
                            <Row  className="align-items-center justify-content-md-center">
                                Professor:
                                    {professors.map((x)=> {
                                        return(<p>{x}</p>);
                                    })}
                            </Row>
                        </Container>
                    </Card.Text>
                    <div className="courseButtonElements">
                        <Button
                        variant="outline-light"
                        onClick={signUpShow}
                        >
                                Assign
                        </Button>
                    </div>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={signUpClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="First Name"
                        aria-label="fName"
                        aria-describedby="basic-addon1"
                        onChange={(e) => {setSearchInputs({...searchInputs, firstName: e.target.value})}}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Last Name"
                        aria-label="lName"
                        aria-describedby="basic-addon1"
                        onChange={(e) => {setSearchInputs({...searchInputs, lastName: e.target.value})}}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 align-items-center justify-content-md-center">
                    <Button variant="primary" onClick = {handleSearch}>Filter</Button>
                    </InputGroup>
                    <Card>
                        <ErrorProvider>
                            {!touched ? <></> :
                            searchResults.length <= 0 ? <h1>No Results Found</h1>:
                            searchResults.map(r => {
                                return <AssignTeacherBlock 
                                    teacher={r}
                                    setShow = {setShow}
                                    webinarID = {webinar._id}
                                />;
                            }) }
                        </ErrorProvider>
                    </Card>
                </Modal.Body>    
                </Modal>
        </div>
    )
}
