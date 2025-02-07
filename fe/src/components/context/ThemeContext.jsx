import React, { createContext, useState } from "react";

// Create Context for theme
export const ThemeContext = createContext();

// Provider of theme
export const ThemeProvider = ({ children }) => {
    const [lightMode, setlightMode] = useState(false);

    const togglelightMode = () => {
        setlightMode(!lightMode);
    };
    
    return (
        <ThemeContext.Provider value={{ lightMode, togglelightMode }}>
            {children}
        </ThemeContext.Provider>
    );
};