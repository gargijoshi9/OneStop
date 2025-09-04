import React, { createContext, useEffect } from "react";


const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    useEffect(() => {
        const root = window.document.documentElement;


        root.classList.remove("light", "dark");


        root.classList.add("dark");
    }, []);
    return (
        <ThemeContext.Provider value={null}>
            {children}
        </ThemeContext.Provider>
    );
};