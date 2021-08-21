import React, { useState } from 'react'
import "../css/AllCourses.css";
import { Container, Row, Col, FloatingLabel, Form, Button } from 'react-bootstrap';
import AssignBlock from './AssignBlock';
import axios from 'axios';

export default function Assign() {

    const [searchInputs, setSearchInputs] = useState({});
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async() => {
        try{
            let { data } = await axios.get("/api/admin/webinars", {params: searchInputs});
            setSearchResults(data);
        }
        catch(e){
            setSearchResults([]);
        }
    }

    return (
        <section className="custom-section" style={{minHeight:'90vh'}}>
                <Container className="justify-content-md-center" style={{minHeight:'inherit',display:'flex'}}>
                    <Row className="align-items-center justify-content-md-center" style={{minHeight:'inherit',display:'flex'}}>
                        <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Search for the Course"
                            className="align-items-center justify-content-md-center"
                        >
                            <Form.Control type="text" placeholder="" onChange = {(e) => {
                                setSearchInputs({...searchInputs, name: e.target.value});
                            }} />
                        </FloatingLabel>
                        <Button variant="light" size="sm" onClick = {handleSearch}>Search</Button>
                            {searchResults.length > 0 ? searchResults.map((res) => {return <AssignBlock webinar={res}/>}) : 
                            <></>}
                        </Col>
                    </Row>
                </Container>
                <div className="space">
                </div>
        </section>
    )
}
