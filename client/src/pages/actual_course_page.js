import { useContext } from 'react';
import Navbar from '../components/Navbar';
import ActualCourse from "../components/CourseLayout";
import Sidebar from '../components/Sidebar'
import { UserContext } from '../contexts/UserContext';

export default function LoginPage() {

    return (
        <div>
            <Sidebar />
            <ActualCourse/>
        </div>
    )
}
