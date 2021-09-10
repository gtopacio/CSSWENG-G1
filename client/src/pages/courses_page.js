import {useContext} from 'react';
import { Redirect } from 'react-router';
import Courses from '../components/Courses';
import Sidebar from '../components/Sidebar';
import { UserContext } from '../contexts/UserContext';
import '../css/Global.css' ;

export default function CoursesPage() {

    const [user] = useContext(UserContext);

    if(!user.validated && !user.refreshSent){
        return <Redirect to="/courses/available" />
    }

    return (
        <div>
            <Sidebar />
            <Courses />
        </div>
    )
}
