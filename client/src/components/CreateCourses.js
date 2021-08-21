import { useState } from 'react'
import {Modal, FormControl, Form, Button} from 'react-bootstrap';

import axios from 'axios';


export default function CreateCourses() {

    const [show, setShow] = useState(true);
    const [success, setSuccess] = useState(false);
    const [touched, setTouched] = useState(false);
    const [inputs, setInputs] = useState({});
    
    const cancelHandler = async() => {
        setTouched(true);
        setSuccess(false);
        setShow(false);
    }

    const submitHandler = async() => {
        let formData = new FormData();  
        for(let key in inputs){
            if(inputs.hasOwnProperty(key)){
                formData.append(key, inputs[key]);
            }
        }
        try{
            let { data } = await axios.post("/api/admin/webinar", formData);
            if(data.success){
                setSuccess(true);
                setTouched(true);
                setShow(false);
            }
            else{
                setSuccess(false);
                setTouched(true);
                setShow(false);
            }
        }
        catch(e){
            setSuccess(false);
            setTouched(true);
            setShow(false);
            console.log(e.response.data.errors);
        }
    }

    return (
        <div>
            {(touched && success ? <h1>Success</h1> : 
            touched ? <h1>Not Successful</h1> : <></>)}
            <Modal 
                show={show} 
                onHide={cancelHandler} 
                centered
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create Course
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group
                        className="mb-3"
                        controlId="createCoursesName"
                        >
                        <FormControl   
                            placeholder="Course Name" 
                            aria-label="fName"
                            aria-describedby="basic-addon1"
                            onChange = {(e) => {
                                setInputs({...inputs, name:e.target.value})
                            }}
                        />
                    </Form.Group>
                    <Form.Group
                            className="mb-3"
                            controlId="createCoursesUploadCoverPhoto"
                        >
                        <Form.Label>Cover Photo</Form.Label>
                        <FormControl
                            placeholder="Cover Photo"
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange = {(e) => {
                                setInputs({...inputs, banner: e.target.files[0]})
                            }}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="secondary"
                        onClick={cancelHandler}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={submitHandler}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
