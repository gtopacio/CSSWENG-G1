import { useEffect, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import image10 from '../../images/image10.jpg';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

export default function CourseCard({webinar, showButton=true}) {

    const [user, setUser] = useContext(UserContext);

    let {webinars = {}, webinarsTaught = {}} = user;

    let {bannerLink, name="Webinar Name", price = "0"} = webinar;

    const [teacher, setTeacher] = useState([]);

    useEffect(() => {
        async function getTeacher(){
            let teacherIDs = Object.keys(webinar.teachers);
            let promises = [];
            for(let teacherID of teacherIDs){
                promises.push(axios.get("/api/public/user", {params:{_id: teacherID}}));
            }

            let teacherNames = await Promise.all(promises);
            teacherNames = teacherNames.map((res) => {return `${res.data.user.firstName} ${res.data.user.lastName}`});
            setTeacher(teacherNames);
        }

        if(webinar.teachers){
            getTeacher();
        }
    }, []);

    return (
        <Card style={{ maxWidth: '18rem', zIndex:-1,position:'relative'}}>
            <Card.Img src={bannerLink ? bannerLink : image10} style={{maxHeight: "18vh", objectFit: "cover", objectPosition: "100% 0"}}/>
            <Card.Header style={{backgroundColor: "#181a46"}}>
                <Card.Title>
                    {name}
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                Teacher:<br />
                {teacher.length <= 0 ? "None" : 
                teacher.map(x => { return <p>{x}</p>})}
                </Card.Text>
                <Card.Text>
                    {`Price: ${price}`}
                </Card.Text>
                <Card.Text>
                    {`Schedule:`}<br />
                    {webinar.schedule.map(x => { return <p>{new Date(x).toString()}</p>})}
                </Card.Text>
            </Card.Body>
            {showButton ? <Card.Footer>
                {webinars[webinar._id] || webinarsTaught[webinar._id] ? <Link to={`/webinar?id=${webinar._id}`}><Button variant="secondary">Continue</Button></Link> 
                : <Link to={`/courses/enroll?webinarID=${webinar._id}`}><Button variant="secondary">Enroll</Button></Link>}
            </Card.Footer> :
            <></>}
        </Card>
    )
}
