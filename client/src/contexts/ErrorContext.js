import React, {useState, createContext} from "react";

export const ErrorContext = createContext();

export const ErrorProvider = (props) => {
    const [errors, setErrors] = useState({
        show: false,
        title: "Errors"
    });

    return (
        <ErrorContext.Provider value={[errors, setErrors]}>
            {props.children}
        </ErrorContext.Provider>
    )
}