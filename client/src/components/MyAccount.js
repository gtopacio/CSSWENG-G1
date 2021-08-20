import {useState} from 'react';
import defaultdp from "../images/defaultdp.jpg";
import CourseBlock from './CourseBlock';

import '../css/MyAccount.css';
import * as DidaskoAccount from 'react-bootstrap';
export default function MyAccount(props) {

    const [loading, setLoading] = useState(true);

    const [studentCourses, setStudentCourses] = useState({});
    const [teachingCourses, setTeachingCourses] = useState({});

    

    return (
        <section style={{height:'83vh'}}>
            <div className="space">

            </div>
            <div className="container">
                <div className="row align-items-start mt-6 mb-1">
                    <div className="col-3" id="profilePanel">
                        <div className="profileGroup">
                            <img src={props.user.profilePicture ? `https://drive.google.com/uc?id=${props.user.profilePicture}` : defaultdp} width = "100px" height="100px"></img>
                            <div className="textGroup">
                                <p to="#" style={{color: 'black',fontSize:'30px', textDecorationLine:"underline"}}>{props.user.firstName} {props.user.lastName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-9" id="coursesPanel">
                        <div id="textHeader">
                            <h1 style={{fontSize:'24px'}}>
                                Welcome back, {props.user.firstName}!
                            </h1>
                        </div>
                        <hr></hr>
                        <div>
                        <DidaskoAccount.Row>
                            {loading ? <h1>Loading</h1> : 
                            <DidaskoAccount.Col>
                                  <CourseBlock webinarTitle="Intermediate Math Course"/>                                   
                            </DidaskoAccount.Col>}
                        </DidaskoAccount.Row>
                          
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
