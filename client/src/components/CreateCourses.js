import React from 'react'
import * as DidaskoCreateCourses from 'react-bootstrap';

import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';


export default function CreateCourses() {

    const [show, setShow] = useState(true);
    const createCourseClose = () => setShow(false);

    return (
        <div>
            <DidaskoCreateCourses.Modal 
                show={show} 
                onHide={createCourseClose} 
                centered
                backdrop="static"
                keyboard={false}
                >
                <DidaskoCreateCourses.Modal.Header closeButton>
                    <DidaskoCreateCourses.Modal.Title id="contained-modal-title-vcenter">
                        Create Course
                    </DidaskoCreateCourses.Modal.Title>
                </DidaskoCreateCourses.Modal.Header>
                <DidaskoCreateCourses.Modal.Body>
                    <DidaskoCreateCourses.Form.Group
                        className="mb-3"
                        controlId="createCoursesName"
                        >
                        <DidaskoCreateCourses.FormControl   
                            placeholder="Course Name" 
                            aria-label="fName"
                            aria-describedby="basic-addon1"
                        />
                    </DidaskoCreateCourses.Form.Group>
                    <DidaskoCreateCourses.Form.Group
                        className="mb-3"
                        controlId="createCoursesSelectCourse"
                        >
                        <DidaskoCreateCourses.Form.Select>
                            <option>--Select Course--</option>
                            <option value="1">Mathemathics</option>
                            <option value="2">Science</option>
                            <option value="3">English</option>
                        </DidaskoCreateCourses.Form.Select>
                    </DidaskoCreateCourses.Form.Group>
                    <DidaskoCreateCourses.Form.Group
                            className="mb-3"
                            controlId="createCoursesUploadCoverPhoto"
                        >
                        <DidaskoCreateCourses.Form.Label>Cover Photo</DidaskoCreateCourses.Form.Label>
                        <DidaskoCreateCourses.FormControl
                            placeholder="Cover Photo"
                            type="file"
                            accept=".jpg, .jpeg, .png"
                        />
                    </DidaskoCreateCourses.Form.Group>
                </DidaskoCreateCourses.Modal.Body>
                <DidaskoCreateCourses.Modal.Footer>
                    <DidaskoCreateCourses.Button 
                        variant="secondary"
                        onClick={createCourseClose}>
                        Cancel
                    </DidaskoCreateCourses.Button>
                    <DidaskoCreateCourses.Button variant="primary">Confirm</DidaskoCreateCourses.Button>
                </DidaskoCreateCourses.Modal.Footer>
            </DidaskoCreateCourses.Modal>
        </div>
    )
}
