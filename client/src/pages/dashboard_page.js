import React from 'react';
import MyAccount from '../components/MyAccount';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar';

export default function DashboardPage() {
    return (
        <div>
            <Sidebar/>
            <MyAccount />
            <Footer />
        </div>
    )
}
