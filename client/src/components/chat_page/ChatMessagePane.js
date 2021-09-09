import { useState, useEffect } from 'react';
import ChatMessageInput from './ChatMessageInput';
import ChatBody from './ChatBody';
import ChatHeader from './ChatHeader';

export default function ChatMessagePane({ user, thread }) {

    const [inputMessage, setInput] = useState("");

	useEffect(()=>{
		console.log(thread);
	}, [thread]);

	function broadcastMessage(){
		let message = {
			thread,
			msg: inputMessage,
			sender: user._id
		}
		user.socket.emit("message sent", message);
	}

    function sendMessage(e, inputArea){
		if(e.keyCode == 13 && e.shiftKey == false) {
			e.preventDefault();
			broadcastMessage();
			inputArea.current.value = "";
			setInput("");
		}
	}

	function sendMessageOnClick(e, inputArea){
		e.preventDefault();
		broadcastMessage();
		inputArea.current.value = "";
		setInput("");
	}

    return (
        <div className="card">
            <ChatHeader thread={thread} user = {user}/>
            <ChatBody thread={thread} user = {user}/>
            <ChatMessageInput setInput={setInput} sendMessage={sendMessage} sendMessageOnClick={sendMessageOnClick}/>
        </div>
    )
}
