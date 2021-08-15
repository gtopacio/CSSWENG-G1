import {useContext, useState, useEffect} from 'react';
import {ErrorContext} from "../contexts/ErrorContext";
import Modal from 'react-bootstrap/Modal';


export default function ErrorPopup() {

    const [errors, setErrors] = useContext(ErrorContext);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if(errors.show)
            setShow(true);
    }, [errors]);

    return (
        <Modal show={show} onHide = {() => setShow(false)} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>{errors.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {errors.msg ? errors.msg.map(x => <p>{x}</p>) : <></>}
        </Modal.Body>
      </Modal>
    )
}
