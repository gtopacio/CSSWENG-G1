import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import SearchBar from '../components/all_courses_page/SearchBar';
import SearchResults from "../components/all_courses_page/SearchResults";
import Recent from "../components/all_courses_page/Recent";
import Sidebar from '../components/SidebarAdmin'
import axios from 'axios';
import '../css/Global.css';

export default function AssignPage() {
    const [input, setInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setLoading(true);
            axios.get("/api/admin/webinars", {params: {name: input}})
            .then(({ data }) => {
                setSearchResults(data);
                setLoading(false);
            });
            
        }, 1000);
    
        return () => clearTimeout(delayDebounceFn)
    }, [input]);

    return (
        <div>
            <Sidebar/>
            <Container fluid>
                <Row><SearchBar setInput = {setInput} assignTeacher={true}/></Row>
                <Row>{
                    input.trim() === "" ? <Recent assignTeacher={true}/> :
                    <SearchResults webinars = {searchResults} loading = {loading} assignTeacher={true}/>
                    }
                </Row>
            </Container>
        </div>
    )
}