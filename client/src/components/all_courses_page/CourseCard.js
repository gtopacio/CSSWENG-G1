import React from 'react';
import Card from 'react-bootstrap/Card';
import image10 from '../../images/image10.jpg';
import Button from 'react-bootstrap/Button';

export default function CourseCard({webinar}) {

    let {bannerLink, name="Webinar Name", price = "0", teacher="None"} = webinar;

    return (
        <Card style={{ width: '18rem' }}>
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
                <Button variant="secondary">Enroll</Button>
            </Card.Footer>
        </Card>
    )
}
