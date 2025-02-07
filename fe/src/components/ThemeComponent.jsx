import React, { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { Button, Image } from "@chakra-ui/react"
import "@/index.css";

function ThemeComponent() {
    // use Context to pass the theme mode externally
    const { lightMode, togglelightMode } = useContext(ThemeContext); 

    return (
        <Button onClick={togglelightMode} backgroundColor="transparent" variant="ghost">
            <Image src={lightMode ? "images/moon.png" : "images/sunny.png"} width="24px" height="24px" />
        </Button>
    );
}

export default ThemeComponent;