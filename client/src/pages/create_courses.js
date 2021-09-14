import React from 'react'
import CreateCourse from '../components/CreateCourses'
import Sidebar from '../components/SidebarAdmin'

export default function CreateCourses({ history }) {
    return (
        <div>
            <Sidebar />
            <CreateCourse history={history} />
        </div>
    )
}