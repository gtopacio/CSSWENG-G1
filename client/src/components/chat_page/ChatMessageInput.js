import { useRef } from 'react';
import * as AiIcons from 'react-icons/ai';
import Form from 'react-bootstrap/Form';

export default function ChatMessageInput({setInput, sendMessage, sendMessageOnClick}) {

    const inputArea = useRef(null);

    return (
        <div className="card-footer">
            <div className="input-group">
                <div className="input-group-append">
                <Form.Group controlId="formFile">
                    <span className="input-group-text attach_btn"><AiIcons.AiOutlinePaperClip /></span>
                    </Form.Group>
                </div>
                <Form.Control as="textarea" ref={inputArea} rows={3} placeholder="Enter message" onKeyDown={(e) => {
                    sendMessage(e, inputArea)
                }} onChange={(e) => {
                        setInput(e.target.value)
                    }}/>
                <div className="input-group-append">
                    <span className="input-group-text send_btn" onClick={(e) => {
                        sendMessageOnClick(e, inputArea)
                    }}><AiIcons.AiOutlineEnter /></span>
                </div>
            </div>
        </div>
    )
}
