import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import defaultdp from "../../images/defaultdp.jpg";

export default function Contact({thread, user, requestThread}) {

    const [online, setOnline] = useState(false);
    const [loading, setLoading] = useState(true);
    const [otherUser, setOtherUser] = useState({
        firstName: "Empty",
        lastName: ""
    });

    useEffect(() => {
        async function getOtherUser(){
            let { participants } = thread;
            let otherUserID;
            for(let x of participants){
                if(x !== user._id){
                    otherUserID = x;
                    break;
                }
            }
            let { data } = await axios.get("/api/public/user", {params: {_id: otherUserID}});
            setOtherUser(data.user);
        }

        if(thread){
            getOtherUser();
        }
    }, [thread]);

    useEffect(()=>{
        if(user.validated){
            user.socket.on("receive ping", (data) => {
                if(data.userID === otherUser._id){
                    setOnline(data.online);
                }
            });
            user.socket.emit("ping", {room: otherUser._id, requestee: user._id});
            setLoading(false);
        }
    }, [user, otherUser]);

    return loading ? <></> : (
        <li onClick={() => {
            requestThread(otherUser._id)
        }}>
            <div className="d-flex bd-highlight">
                <div className="img_cont">
                    <img src={otherUser.profilePicture ? `https://drive.google.com/uc?id=${otherUser.profilePicture}` : defaultdp} className="rounded-circle user_img" alt="xd"/>
                    <span className={online ? "online_icon" : "online_icon offline"}></span>
                </div>
                <div className="user_info">
                    <span>{`${otherUser.firstName} ${otherUser.lastName}`}</span>
                    <p>{online ? "Online" : "Offline"}</p>
                </div>
            </div>
        </li>
    )
}
