import React, {useState, createContext} from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState({
        email: "",
        firstname: "",
        lastname: "",
        admin: false,
        token: ""
    });

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}