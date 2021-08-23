import { useState, useContext } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ScheduleBlock from './ScheduleBlock';
import { ErrorContext } from '../../contexts/ErrorContext';


export default function ScheduleSetter({ setInputSchedules, errors }) {

    const [schedule, setScheduleArray] = useState([]);
    const [dateInput, setDateInput] = useState(new Date());
    const [showPicker, setShow] = useState(false);
    const [error, setError] = useContext(ErrorContext);

    function setSchedule(sched){
        setScheduleArray(sched);
        setInputSchedules(sched);
    }

    function deleteComponent(date){
        let newArray = schedule.filter((curr) => curr !== date);
        console.log("delete", newArray);
        setSchedule(newArray);
    }

    return (
        <Container fluid className="my-3">
            <Card border={errors ? "danger" : "secondary"}>
                <Card.Body>
                    <Container>
                        {schedule.map((x, index) => {return <ScheduleBlock key={index} schedule={x} deleteComponent={deleteComponent} />})}
                    </Container>
                </Card.Body>
            </Card>
            <Card border="light" text="danger">
                {errors}
            </Card>
            <Row hidden={showPicker} className="mt-2">
                <Col xs={{offset: 8}} auto>
                    <Button variant="primary" onClick={(e) => {setShow(true)}}>AddSchedule</Button>
                </Col>
            </Row>
            <Row hidden={!showPicker}>
                <Col xs auto className="my-2">
                    <DateTimePicker 
                        onChange={setDateInput}
                        value={dateInput}
                    />
                    <Button variant="primary" className="mx-1" onClick = {(e) => {
                        
                        if(schedule.includes(dateInput)){
                            setError({
                                show: true,
                                msg: ["Date already added!"],
                                title: "Multiple Dates"
                            });
                            return;
                        }

                        let copy = schedule;
                        copy.push(dateInput);
                        setSchedule(copy);
                        setShow(false);
                        }}>+</Button>
                        <Button variant="secondary" onClick = {(e) => {setShow(false);}}>Hide</Button>
                </Col>
            </Row>
        </Container>
    )
}
