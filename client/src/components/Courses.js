import { useState, useEffect, useContext } from 'react'
import "../css/AllCourses.css";
import * as DidaskoCard from 'react-bootstrap';
import TeachingBlock from './courses_page/TeachingBlock';
import StudentBlock from './courses_page/StudentBlock';
import axios from 'axios';
import '../css/Global.css' ;
import { UserContext } from '../contexts/UserContext';

export default function Courses() {

    const [user] = useContext(UserContext);

    const [studentWebinars, setStudentWebinars] = useState([]);
    const [teacherWebinars, setTeacherWebinars] = useState([]);
    const [loading, setLoading] = useState(true);

    async function sendRequest() {
        let { data } = await axios.get("/api/accounts/courses");
        setStudentWebinars(data.studentWebinars);
        setTeacherWebinars(data.teacherWebinars);
        setLoading(false);
    }

    useEffect(() => {
        sendRequest();
    }, [user]);

    return (
        <section className="custom-section" style={{minHeight:'90vh'}}>
            <div className="mb-5"></div>
                <div>
                    {/* <DidaskoCard.Button onClick={(e) => {sendRequest()}}>Refresh</DidaskoCard.Button> */}
                    <DidaskoCard.Container style={{minHeight:'90vh'}}>
                        <div className="col-12" id="coursesPanel">
                            <div id="textHeader">
                                <h1 className="fw-bold" style={{fontSize:'26px',color:'white'}}>
                                    Student Webinars
                                </h1>
                            </div>
                            <hr style={{color:'white'}}></hr>
                            <div>
                            <DidaskoCard.Row>
                                {loading ? <h1 style={{color: 'white'}}>Loading</h1> : 
                                    studentWebinars.length <= 0 ? <h1 style={{color: 'white'}}>Empty</h1> :
                                    studentWebinars.map(r => {return <StudentBlock webinar={r} />})
                                }
                            </DidaskoCard.Row>
                            </div>
                        </div>
                        
                        <div className="mb-5"></div>
                            <div className="col-12  " id="coursesPanel">
                                <div id="textHeader">
                                    <h1 className="fw-bold" style={{fontSize:'26px',color:'white'}}>
                                        Teaching Webinars
                                    </h1>
                                </div>
                                <hr style={{color:'white'}}></hr>
                                <div>
                                <DidaskoCard.Row>
                                {loading ? <h1 style={{color: 'white'}}>Loading</h1> : 
                                    teacherWebinars.length <= 0 ? <h1 style={{color: 'white'}}>Empty</h1> :
                                    teacherWebinars.map(r => {return <TeachingBlock webinar={r} />})
                                }
                                </DidaskoCard.Row>
                                </div>
                            </div>
                    </DidaskoCard.Container>
            </div>
        </section>
    )
}
