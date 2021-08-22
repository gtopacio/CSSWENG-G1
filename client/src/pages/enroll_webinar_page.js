import React from 'react';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router';
import qs from 'qs';

export default function EnrollWebinar() {

    let location = useLocation();
    let webinarID = qs.parse(location.search, { ignoreQueryPrefix: true }).webinarID;

    return (
        <div>
            <Navbar />
            <h1>{webinarID}</h1>
        </div>
    )
}
