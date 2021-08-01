import React from 'react';
import MyAccount from '../components/MyAccount';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function DashboardPage() {
    return (
        <div>
            <Navbar/>
            <MyAccount />
            <Footer />
        </div>
    )
}
