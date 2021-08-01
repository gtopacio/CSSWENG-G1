import React from 'react';
import "../css/Footer.css";
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer>
            <h1 className="cName">didasko</h1>
            <Link to="/" className="footer_a">Home</Link>
            <Link to="/courses" className="footer_a">All Courses</Link>
            <Link to="/about" className="footer_a">About</Link>
            <Link to="/dashboard" className="footer_a">My Account</Link>
        </footer>
    )
}
