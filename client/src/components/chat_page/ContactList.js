import React from 'react';
import Contact from './Contact';

export default function ContactList({ threads, requestThread, user }) {
    return (
        <>
            {threads.size <= 0 ? <h1>Empty</h1> :
            threads.map((x) => {
                return <Contact key={x._id} thread = {x} user={user} requestThread={requestThread}/>
            })}
        </>
    )
}
