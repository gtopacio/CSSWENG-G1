import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import SearchBar from '../components/all_courses_page/SearchBar';
import SearchResults from "../components/all_courses_page/SearchResults";
import Recent from "../components/all_courses_page/Recent";
import axios from 'axios';

export default function AllCoursesPage() {

    const [input, setInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setLoading(true);
            axios.get("/api/public/webinar", {params: {name: input}})
            .then(({ data }) => {
                setSearchResults(data.webinars);
                setLoading(false);
            });
            
        }, 1000);
    
        return () => clearTimeout(delayDebounceFn)
    }, [input]);

    return (
        <Container fluid>
            <Row><Navbar /></Row>
            <Row><SearchBar setInput = {setInput}/></Row>
            <Row>{
                input.trim() === "" ? <Recent /> :
                <SearchResults webinars = {searchResults} loading = {loading}/>
                }</Row>
        </Container>
    )
}
