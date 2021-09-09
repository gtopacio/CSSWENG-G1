import React from 'react';
import defaultdp from '../../images/defaultdp.jpg';

export default function SearchResult({ user, onClick }) {

    let {firstName, lastName, profilePictureLink} = user;

    return (
        <li onClick={onClick}>
            <div className="d-flex bd-highlight">
                <div className="img_cont">
                    <img src={profilePictureLink ? profilePictureLink : defaultdp} className="rounded-circle user_img" alt="xd"/>
                </div>
                <div className="user_info">
                    <span>{`${firstName} ${lastName}`}</span>
                </div>
            </div>
        </li>
    )
}
