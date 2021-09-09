import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {UserContext} from '../../contexts/UserContext';
import defaultdp from "../../images/defaultdp.jpg";
import moment from 'moment';

export default function ChatMessage({msg}) {

    const [user] = useContext(UserContext);
    const [otherUser, setOtherUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getOtherUser(){
            let { data } = await axios.get("/api/public/user", {params: {_id: msg.sender}});
            setOtherUser(data.user);
            setLoading(false);
        }
        getOtherUser();
    }, []);

    return loading ? <></> : user._id !== msg.sender ? (
        <div className="d-flex justify-content-start mb-4" >
            <div className="img_cont_msg">
                <img src={otherUser.profilePictureLink ? otherUser.profilePictureLink : defaultdp} className="rounded-circle user_img_msg" alt="xd"/>
            </div>
            <div className="msg_cotainer">
                {msg.textMessage}
                <span className="msg_time">{moment(msg.dateSent).fromNow()}</span>
            </div>
        </div>
    ) :
    (
        <div className="d-flex justify-content-end mb-4" >
            <div className="msg_cotainer_send">
                {msg.textMessage}
                <span className="msg_time_send">{moment(msg.dateSent).fromNow()}</span>
            </div>
            <div className="img_cont_msg">
            <img src={user.profilePictureLink ? user.profilePictureLink : defaultdp} className="rounded-circle user_img_msg" alt="xd"/>
            </div>
        </div>
    )
}
