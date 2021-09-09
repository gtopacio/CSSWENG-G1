import { useState, useEffect } from 'react'
import SearchResult from './SearchResult'
import defaultdp from "../../images/defaultdp.jpg"

export default function SearchList({user, results, onClick, resetSearch}) {

    const [displayed, setDisplayed] = useState([]);

    useEffect(() => {
        let trimmed = results.filter((x) => x.firstName !== user.firstName && x.lastName !== user.lastName);
        setDisplayed(trimmed);
    }, [results]);

    return (
        <div>
            {displayed.map((x) => {
                x.profilePicture = x.profilePictureLink ? x.profilePictureLink : defaultdp;
                return <SearchResult user = {x} onClick={() => {
                    onClick(x._id);
                    resetSearch()
                }}/>
            })}
        </div>
    )
}
