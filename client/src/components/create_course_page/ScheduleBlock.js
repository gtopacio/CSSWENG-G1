import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function ScheduleBlock({schedule, deleteComponent}) {
    return (
        <Row fluid>
            <Col xs={10} auto>
                <p>{schedule.toString()}</p>
            </Col>
            <Col xs auto>
                <Button variant="danger" onClick={(e) => {deleteComponent(schedule)}}>-</Button>
            </Col>
        </Row>
    )
}
