import { useState } from 'react'
import {Modal, FormControl, Form, Button, InputGroup} from 'react-bootstrap';

import axios from 'axios';


export default function CreateCourses() {

    const [show, setShow] = useState(true);
    const [success, setSuccess] = useState(false);
    const [touched, setTouched] = useState(false);
    const [submitAttempt, setAttempt] = useState(false);
    const [inputs, setInputs] = useState({price: 0});
    const [priceShow, setPriceShow] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    
    const cancelHandler = async() => {
        setAttempt(true);
        setSuccess(false);
        setShow(false);
    }

    const checkError = () => {
        let errors = {};
        if(!inputs.name || inputs.name.trim() === ""){
            errors.name = "Webinar Name should not be empty";
        }

        if(inputs.price <= 0 && !priceShow){
            errors.price = "Price should be greater than 0";
        }

        
        if(isNaN(inputs.price)){
            errors.price = "Price is not a Number";
        }

        setFormErrors(errors);
        return errors;
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        if(Object.keys(checkError()).length > 0){
            e.stopPropagation();
            setTouched(true);
            return;
        }

        console.log(inputs);

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
            }
            else{
                setSuccess(false);
            }
            setAttempt(true);
            setShow(false);
        }
        catch(e){
            setSuccess(false);
            setAttempt(true);
            setShow(false);
            console.log(e.response.data.errors);
        }
    }

    return (
        <div>
            {(submitAttempt && success ? <h1>Success</h1> : 
            submitAttempt ? <h1>Not Successful</h1> : <></>)}
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
                    <InputGroup
                        hasValidation
                        className="mb-3"
                        controlId="createCoursesName"
                        >
                        <FormControl   
                            placeholder="Course Name" 
                            aria-label="fName"
                            name="name"
                            aria-describedby="basic-addon1"
                            isInvalid = {touched && formErrors.name}
                            onChange = {(e) => {
                                setInputs({...inputs, name:e.target.value})
                            }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.name}
                        </Form.Control.Feedback>
                    </InputGroup>
                    <Form.Group
                            className="mb-3"
                            controlId="createCoursesUploadCoverPhoto"
                        >
                        <Form.Label>Cover Photo</Form.Label>
                        <FormControl
                            placeholder="Cover Photo"
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            name="banner"
                            onChange = {(e) => {
                                setInputs({...inputs, banner: e.target.files[0]})
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            type="switch"
                            label="Free"
                            onClick={(e) => {
                                setPriceShow(e.target.checked);
                                if(e.target.checked)
                                    setInputs({...inputs, price:0})}}>
                        </Form.Check>
                    </Form.Group>
                    {!priceShow ? 
                        <InputGroup hasValidation>
                            <Form.Control
                            type="number"
                            defaultValue={0}
                            name="price"
                            isInvalid={touched && formErrors.price}
                            onChange = {(e) => setInputs({...inputs, price:parseFloat(e.target.value)})}>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {formErrors.price}
                            </Form.Control.Feedback>
                        </InputGroup>
                             : <></>}
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
