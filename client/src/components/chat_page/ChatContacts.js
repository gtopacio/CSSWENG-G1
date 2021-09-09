import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import '../../css/Chat.css';
import ContactList from './ContactList';
import SearchList from './SearchList';
import axios from 'axios';

export default function ChatContacts({ user, requestThread }) {

    const [searching, setSearching] = useState(true);
    const [input, setInput] = useState("");
    const [results, setSearchResults] = useState([]);
    const [recent, setRecent] = useState([]);

    function resetSearch(){
        setSearchResults([]);
        setSearching(false);
        setInput("");
    }

    useEffect(() => {
        async function getRecent(){
            let { data } = await axios.get("/api/accounts/chat/recent");
            if(data.success){
                setRecent(data.threads);
            }
        }
        getRecent();
    }, []);

    useEffect(() => {
        async function search(){
            setSearching(true);
            let { data } = await axios.get("/api/public/user/name", {params:{name: input}});
            if(data.success){
                setSearchResults(data.users);
            }
        }

        if(input === ""){
            setSearching(false);
            return;
        }
        search();
    }, [input]);

    useEffect(() => {
        if(user.validated){
            let { socket } = user;
            socket.off("new message on thread");
            socket.on("new message on thread", (thread) => {
                if(!searching){
                    let filteredRecent = recent.filter((x) => {
                        return x._id !== thread._id
                    });
                    setRecent([thread, ...filteredRecent]);
                }
            });
        }
    }, [requestThread, recent]);

    return (
        <div className="col-md-4 col-xl-3 chat">
            <div className="card mb-sm-3 mb-md-0 contacts_card">
					<div className="card-header chat-bg-additional">
                        <Form.Group className="input-group" >
                        <Form.Control type="text" placeholder="Search" value={input} onChange={(e) => setInput(e.target.value)} />
                        </Form.Group>
					</div>
					<div className="card-body contacts_body">
						<ul className="contacts">
                            {searching ? <SearchList user={user} results={results} onClick={requestThread} resetSearch={resetSearch} /> 
                            : <ContactList threads={recent} requestThread={requestThread} user={user} />}
						</ul>
					</div>
					<div className="card-footer"></div>
				</div>
			</div>
    )
}
