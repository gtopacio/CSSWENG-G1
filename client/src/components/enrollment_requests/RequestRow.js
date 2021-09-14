import { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

export default function RequestRow({request}) {

    const [disabledButtons, setDisabled] = useState(false);
    const [successful, setSuccessful] = useState(false);

    async function approve(e){
        e.preventDefault();
        setDisabled(true);
        try{
            let { data } = await axios.post("/api/admin/student", {webinarID: request.webinarID, studentID: request.userID, requestID: request.uid});
            setSuccessful(data.success);
            if(!data.success){
                setDisabled(false);
            }
        }
        catch(e){
            setDisabled(false);
            setSuccessful(false);
        }
    }

    return (
            <tr>
                <td>{request.uid}</td>
                <td>{request.userName}</td>
                <td>{request.webinarName}</td>
                <td>{request.issued}</td>
                <td><Button variant="primary" onClick={approve} disabled={disabledButtons}>{successful ? "Successful" : "Approve" }</Button></td>
            </tr>
    )
}
