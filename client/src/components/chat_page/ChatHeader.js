import { useEffect, useState, useContext } from 'react';
import defaultdp from "../../images/defaultdp.jpg";

export default function ChatHeader({ thread, user }) {

    const [online, setOnline] = useState(false);
    const [otherUser, setOtherUser] = useState({
        firstName: "Empty",
        lastName: "",
        _id: ""
    });

    useEffect(() => {
        if(thread){
            setOtherUser(thread.otherUser);
        }
    }, [thread]);

    useEffect(() => {
        if(user.validated){
            user.socket.on("receive ping", (data) => {
                if(data.userID === otherUser._id){
                    setOnline(data.online)
                }
            });
            user.socket.emit("ping", {room: otherUser._id, requestee: user._id});
        }
    }, [user, otherUser]);

    return (
        <div className="card-header chat-bg-additional msg_head" style={{backgroundColor:"#181a46"}}>
            <div className="d-flex bd-highlight">
                <div className="img_cont">
                    <img src={otherUser.profilePictureLink ? otherUser.profilePictureLink : defaultdp} className="rounded-circle user_img" alt="xd"/>
                    <span className={online ? "online_icon" : "online_icon offline"}></span>
                </div>
                <div className="user_info">
                    <span style={{fontWeight:'bold'}}>{`${otherUser.firstName} ${otherUser.lastName}`}</span>
                    <p>{online ? "Online" : "Offline"}</p>
                </div>
            </div>
        </div>
    )
}
