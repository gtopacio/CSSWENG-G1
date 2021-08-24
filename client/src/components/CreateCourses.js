import { useState, useRef } from 'react'
import { Modal, FormControl, Form, Button, InputGroup, Col} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import ScheduleSetter from './create_course_page/ScheduleSetter';


export default function CreateCourses() {

    const [show, setShow] = useState(true);
    const [success, setSuccess] = useState(false);
    const [submitAttempt, setAttempt] = useState(false);
    const [priceShow, setPriceShow] = useState(false);
    
    const cancelHandler = async() => {
        setAttempt(true);
        setSuccess(false);
        setShow(false);
    }

    const freeCheckbox = useRef(null);

    const FILE_TYPES = ["image/jpg", "image/jpeg", "image/png"];

    const schema = yup.object().shape({
        name: yup.string().required("Enter webinar name"),
        meetingLink: yup.string().required("Enter meeting link"),
        meetingID: yup.string().required("Enter meeting ID"),
        meetingPassword: yup.string().required("Enter meeting password"),
        price: yup.number().test("Valid Input", "Enter a valid price", (value) => {return freeCheckbox.current.checked ? true : value !== undefined}).test("Valid Price", "Price must be greater than 0", (value) => { return freeCheckbox.current.checked ? true : value > 0}),
        banner: yup.mixed().test("fileType", "Invalid file Type", (value) => {return value.type ? FILE_TYPES.includes(value.type) : true}),
        schedule: yup.array().required().min(1, "At least 1 webinar meeting needed")
    });


    const submitHandler = async(inputs, {setSubmitting, setErrors}) => {
        setSubmitting(true);
        let formData = new FormData();  
        for(let key of Object.keys(inputs)){
            if(key === "schedule"){
                formData.append(key, JSON.stringify(inputs[key]));
                continue;
            }
            formData.append(key, inputs[key]);
        }
        try{
            let { data } = await axios.post("/api/admin/webinar", formData);
            setSuccess(data.success);
            setAttempt(true);
            setShow(false);
        }
        catch(e){
            setSuccess(false);
            setAttempt(true);
            setShow(false);
            setErrors(e.response.data.errors)
        }
        finally{
            setSubmitting(false);
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
                    <Formik
                        validationSchema={schema}
                        onSubmit={submitHandler}
                        initialValues={{
                            name: '',
                            meetingLink: '',
                            meetingID: '',
                            meetingPassword: '',
                            banner: {},
                            price: 0,
                            free: false,
                            schedule: []
                        }}
                    >
                        {({
                        handleSubmit,
                        handleChange,
                        validateField,
                        values,
                        touched,
                        errors,
                        }) => (
                        <Form noValidate onSubmit={handleSubmit}>
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
                                    isValid = {touched.name && !errors.name}
                                    isInvalid = {touched.name && errors.name}
                                    onChange = {handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Zoom Link (e.g. https://zoom.us/j/2400983088?pwd=TDVXQWRkSTU5K1ZQMzJwQzRnL3VlQT09)"
                                aria-label="ZoomLink"
                                aria-describedby="basic-addon1"
                                name="meetingLink"
                                isValid = {touched.meetingLink && !errors.meetingLink}
                                isInvalid = {touched.meetingLink && errors.meetingLink}
                                onChange = {handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.meetingLink}
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Meeting ID"
                                aria-label="ZoomID"
                                aria-describedby="basic-addon1"
                                name="meetingID"
                                isValid = {touched.meetingID && !errors.meetingID}
                                isInvalid = {touched.meetingID && errors.meetingID}
                                onChange = {handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.meetingID}
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Zoom Password"
                                aria-label="ZoomPW"
                                aria-describedby="basic-addon1"
                                name="meetingPassword"
                                isValid = {touched.meetingPassword && !errors.meetingPassword}
                                isInvalid = {touched.meetingPassword && errors.meetingPassword}
                                onChange = {handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.meetingPassword}
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
                                    isValid={touched.banner && !errors.banner}
                                    isInvalid={touched.banner && errors.banner}
                                    onChange = {(e) => {
                                        values.banner = e.target.files[0] ? e.target.files[0] : {};
                                        validateField("banner");
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.banner}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Check
                                    type="switch"
                                    label="Free"
                                    name="free"
                                    isChecked = {values.free}
                                    ref={freeCheckbox}
                                    onClick={(e) => {
                                        values.free = e.target.checked;
                                        values.price = 0;
                                        validateField("price");
                                        setPriceShow(e.target.checked);
                                    }}>
                                </Form.Check>
                            </Form.Group>
                            {!priceShow ? 
                                <InputGroup hasValidation>
                                    <Form.Control
                                    type="number"
                                    defaultValue={0}
                                    name="price"
                                    isValid={touched.price && !errors.price}
                                    isInvalid={touched.price && errors.price}
                                    onChange = {handleChange}>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.price}
                                    </Form.Control.Feedback>
                                </InputGroup>
                                        : <></>}
                            <InputGroup>
                            <InputGroup hasValidation>
                                <ScheduleSetter setInputSchedules = {(sched) => {
                                    values.schedule = sched;
                                    validateField("schedule")
                                }}
                                errors={errors.schedule}
                                />
                            </InputGroup>
                            </InputGroup>
                            <InputGroup className="mt-3">
                                <Col sm = {{auto:true, offset: 8}}>
                                    <Button 
                                        variant="secondary"
                                        onClick={cancelHandler}>
                                        Cancel
                                    </Button>
                                </Col>
                                <Col sm = {{auto:true, offset: 12}}>
                                    <Button variant="primary" type="submit">Confirm</Button>
                                </Col>
                            </InputGroup>
                        </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </div>
    )
}
