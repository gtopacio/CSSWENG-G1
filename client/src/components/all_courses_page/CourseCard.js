import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import image10 from '../../images/image10.jpg';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function CourseCard({webinar, user}) {

    let {webinars = {}, webinarsTaught = {}} = user;

    let {bannerLink, name="Webinar Name", price = "0"} = webinar;

    const [teacher, setTeacher] = useState("None");

    useEffect(() => {
        async function getTeacher(){
            let { data } = await axios.get("/api/public/user", {params:{_id: Object.keys(webinar.teachers)[0]}});
            setTeacher(`${data.user.firstName} ${data.user.lastName}`);
        }

        if(webinar.teachers){
            getTeacher();
        }
    }, []);

    return (
        <Card style={{ maxWidth: '18rem' }}>
            <Card.Img src={bannerLink ? bannerLink : image10} style={{maxHeight: "18vh", objectFit: "cover", objectPosition: "100% 0"}}/>
            <Card.Header>
                <Card.Title>
                    {name}
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                {`Teacher: ${teacher}`}
                </Card.Text>
                <Card.Text>
                    {`Price: ${price}`}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                {webinars[webinar._id] || webinarsTaught[webinar._id] ? <Button variant="secondary">Continue</Button> 
                : <Link to={`/courses/enroll?webinarID=${webinar._id}`}><Button variant="secondary">Enroll</Button></Link>}
            </Card.Footer>
        </Card>
    )
}
