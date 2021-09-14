import { useState, useEffect } from 'react';
import defaultdp from "../images/defaultdp.jpg";
import nocourseimg from "../images/npy.png";
import CourseBlock from './CourseBlock';
import axios from 'axios';

import '../css/MyAccount.css';
import * as DidaskoAccount from 'react-bootstrap';
export default function MyAccount(props) {

    const [loading, setLoading] = useState(true);

    const [studentWebinars, setStudentWebinars] = useState([]);
    const [teacherWebinars, setTeacherWebinars] = useState([]);

    useEffect(() => {
        async function sendRequest() {
            let { data } = await axios.get("/api/accounts/courses");
            setStudentWebinars(data.studentWebinars);
            setTeacherWebinars(data.teacherWebinars);
            setLoading(false);
        }

        sendRequest();
    }, []);

    let renderedStudent = studentWebinars.length > 0 ? 
        studentWebinars.map(s => {
            return (
            <DidaskoAccount.Col key={s._id}>
                <CourseBlock webinarTitle={s.name} _id={s._id}/>                                   
            </DidaskoAccount.Col>)
        }) :
        <DidaskoAccount.Col>
            <div>
                <img src={nocourseimg} style={{width:'100%'}}></img>
            </div>                       
        </DidaskoAccount.Col>;

    let renderedTeacher = teacherWebinars.length > 0 ? 
    teacherWebinars.map(s => {
        return (<DidaskoAccount.Col>
            <CourseBlock webinarTitle={s.name}/>                                   
        </DidaskoAccount.Col>)
    }) :
    <DidaskoAccount.Col>
            <h1>Empty</h1>                                   
    </DidaskoAccount.Col>;

    return (
        <section style={{height:'83vh'}}>
            <div className="space">

            </div>
            <div className="container" style={{zIndex:1,position:'relative'}}>
                <div className="row align-items-start mt-6 mb-1">
                    <div className="col-3" id="profilePanel">
                        <div className="profileGroup">
                            <img src={props.user.profilePicture ? `https://drive.google.com/uc?id=${props.user.profilePicture}` : defaultdp} width = "100px" height="100px" alt="Profile Picture"></img>
                            <div className="textGroup">
                                <p to="#" style={{color: 'white',fontSize:'30px', textDecorationLine:"underline"}}>{props.user.firstName} {props.user.lastName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-9" id="coursesPanel">
                        <div id="textHeader">
                            <h1 style={{fontSize:'24px',color: 'white'}}>
                                Welcome back, {props.user.firstName}!
                            </h1>
                        </div>
                        <hr style={{color: 'white'}}></hr>
                        <div>

                        <DidaskoAccount.Row>
                            {loading ? <h1>Loading</h1> : renderedStudent}
                        </DidaskoAccount.Row>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </section>
    )
}
