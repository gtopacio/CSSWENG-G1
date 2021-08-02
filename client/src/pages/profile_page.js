import React from 'react'
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';

export default function profile_page() {
    return (
        <div>
        <Sidebar/>
        <Profile/>
        <Footer/>               
        </div>
    )
}
