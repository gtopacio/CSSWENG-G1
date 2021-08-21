import React, { useState, useContext } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { ErrorContext } from '../contexts/ErrorContext';

export default function AssignTeacherBlock({teacher, webinarID, setShow}) {

    const [errors, setErrors] = useContext(ErrorContext);
    const [success, setSuccess] = useState(false);

    const handleAssign = async() => {
        try{
            let { data } = await axios.post("/api/admin/teacher", {webinarID, teacherID: teacher._id});
            console.log(data);
            setSuccess(true);
        }
        catch(e){
            console.log(e.response.data.error);
            setErrors(["Server Error"]);
        }
    }

    return (
        <Row>
            <Col>
                <p>{`${teacher.firstName} ${teacher.lastName}`}</p>
            </Col>
            <Col className="col-sm">
                <Button enabled = {success} variant="primary" onClick = {handleAssign}>{success ? "Success" : 'Assign'}</Button>
            </Col>
        </Row>
    )
}
