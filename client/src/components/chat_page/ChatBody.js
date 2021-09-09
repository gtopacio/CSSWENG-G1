import { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import axios from 'axios';

export default function ChatBody({ thread, user }) {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [queuedMessages, setQueuedMessages] = useState([]);

    async function getMessages(){
        let { data } = await axios.get("/api/chat/messages", {params: {id: thread._id}})
        if(data.success){
            setMessages(data.messages);
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.validated){
            let { socket } = user;
            socket.off("message sent");
            socket.on("message sent", (newMessage) => {
                if(newMessage.threadID === thread._id){
                    setQueuedMessages([...queuedMessages, newMessage]);
                }
            });
        }
    }, [user, thread]);

    useEffect(()=>{
        if(queuedMessages.length > 0){
            let newQueue = queuedMessages;
            let nextMessage = newQueue.pop();
            setMessages([...messages, nextMessage]);
            setQueuedMessages(newQueue);
        }
    }, [queuedMessages]);

    useEffect(()=>{
        if(thread !== {}){
            getMessages();
        }
    }, [thread]);

    return (
        <div className="card-body chat-bg-additional msg_card_body" >
            
            {!loading && messages.length > 0 ? messages.map((x) => {
                return <ChatMessage key={x._id} msg={x}/>
            } ) : <h1>Empty</h1>}
            
        </div>
    )
}
