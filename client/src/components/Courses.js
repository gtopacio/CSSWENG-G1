import { useState, useEffect } from 'react'
import "../css/AllCourses.css";
import * as DidaskoCard from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TeachingBlock from './courses_page/TeachingBlock';
import StudentBlock from './courses_page/StudentBlock';
import axios from 'axios';

export default function Courses() {

    const [studentWebinars, setStudentWebinars] = useState([]);
    const [teacherWebinars, setTeacherWebinars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function sendRequest() {
            let { data } = await axios.get("/api/accounts/courses");
            setStudentWebinars(data.studentWebinars);
            setTeacherWebinars(data.teacherWebinars);
            setLoading(false);
        }

        sendRequest();
    }, []);

    return (
        <section className="custom-section" style={{minHeight:'90vh'}}>
            <div className="mb-5"></div>
                <div>
                    <DidaskoCard.Container style={{minHeight:'90vh',zIndex:-1,position:'relative'}}>
                        <div className="col-12" id="coursesPanel">
                            <div id="textHeader">
                                <h1 style={{fontSize:'24px'}}>
                                    Student Webinars
                                </h1>
                            </div>
                            <hr></hr>
                            <div>
                            <DidaskoCard.Row>
                                {loading ? <h1>Loading</h1> : 
                                    studentWebinars.length <= 0 ? <h1>Empty</h1> :
                                    studentWebinars.map(r => {return <StudentBlock webinar={r} />})
                                }
                            </DidaskoCard.Row>
                            </div>
                        </div>
                        
                        <div className="mb-5"></div>
                            <div className="col-12  " id="coursesPanel">
                                <div id="textHeader">
                                    <h1 style={{fontSize:'24px'}}>
                                        Teaching Webinars
                                    </h1>
                                </div>
                                <hr></hr>
                                <div>
                                <DidaskoCard.Row>
                                {loading ? <h1>Loading</h1> : 
                                    teacherWebinars.length <= 0 ? <h1>Empty</h1> :
                                    teacherWebinars.map(r => {return <TeachingBlock webinar={r} />})
                                }
                                </DidaskoCard.Row>
                                </div>
                            </div>
                    </DidaskoCard.Container>
                    <div className="space">
                    It seems you don't have any courses yet, <Link to="#" style={{color: 'black'}}>register?</Link>
                    </div>           
            </div>
        </section>
    )
}
