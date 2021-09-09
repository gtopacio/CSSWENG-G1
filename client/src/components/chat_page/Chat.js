import { useState, useContext } from 'react';
import '../../css/Chat.css';
import axios from 'axios';
import ChatContacts from './ChatContacts';
import { UserContext } from '../../contexts/UserContext';
import ChatMessagePane from './ChatMessagePane';

export default function Chat() {

	const [user] = useContext(UserContext);
	const [focusedThread, setThread] = useState({
		otherUser: {
			firstName: "Empty",
			lastName: ""
		}
	});

	function requestThread(id){
		async function getThread(){
			let { data } = await axios.get("/api/accounts/chat/thread", {params: {id}});
			setThread(data.thread);
		}
		getThread();
	}

    return (
		<div className="container-fluid h-100" style={{minHeight:'90vh'}}>
            <div className="mb-3"></div>
			<div className="row justify-content-center h-100">
				<ChatContacts user = {user} requestThread = {requestThread}/>
				<div className="col-md-8 col-xl-6 chat">
					<ChatMessagePane user={user} thread = {focusedThread}/>
				</div>
			</div>
		</div>
    
    )
}
