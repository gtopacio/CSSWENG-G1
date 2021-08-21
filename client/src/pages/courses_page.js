import {useContext} from 'react';
import { Redirect } from 'react-router';
import Courses from '../components/Courses';
import Sidebar from '../components/Sidebar';
import { UserContext } from '../contexts/UserContext';

export default function CoursesPage() {

    const [user, setUser] = useContext(UserContext);

    if(!user.validated){
        return <Redirect to="/courses/available" />
    }

    return (
        <div>
            <Sidebar />
            <Courses />
        </div>
    )
}
