import React, {useContext, useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoon, faSun, IconDefinition} from '@fortawesome/free-regular-svg-icons';
import {ThemeContext, themeContextType, themeType} from "../sidePanel/App";

type modeType = {
    name: themeType,
    icon: IconDefinition,
    iconColor: "black" | "yellow",
    iconTitle?: string,
};

const ToggleThemeBtn: React.FC = () => {

    const elementId = "ToggleThemeBtn";

    const themeContext: themeContextType = useContext<themeContextType>(ThemeContext);
    const setAppTheme = (theme: themeType) => {
        themeContext.setValue ? themeContext.setValue(theme) : null;
    }

    const darkMode: modeType = {
        name: "dark",
        icon: faMoon,
        iconColor: "yellow",
        iconTitle: "Click to switch to light mode",
    };

    const lightMode: modeType = {
        name: "light",
        icon: faSun,
        iconColor: "black",
        iconTitle: "Click to switch to dark mode",
    };

    const [mode, setMode] = useState<modeType>(lightMode);

    const setModeToDark = () => {
        setMode(darkMode);
        document.body.classList.add("dark"); // < use this method
        setAppTheme(darkMode.name);
        chrome.storage.sync.set({theme: darkMode.name})
            .catch(error => console.log(error));
    };

    const setModeToLight = () => {
        setMode(lightMode);
        document.body.classList.remove("dark"); // < use this method
        setAppTheme(lightMode.name);
        chrome.storage.sync.set({theme: lightMode.name})
            .catch(error => console.log(error));
    };

    const toggleMode = () => {
        if (mode.name === "light") {
            setModeToDark();
        } else {
            setModeToLight()
        }
    };

    useEffect(() => {
        chrome.storage.sync.get(["theme"])
            .then((result) => {
                if (result.theme === darkMode.name) {
                    setModeToDark();
                } else if (result.theme === lightMode.name) {
                    setModeToLight();
                } else {
                    // if no user preferences stored, we follow browser theme
                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                        setModeToDark();
                    } else {
                        setModeToLight();
                    }
                }
            });
    }, []);

    return (
        <FontAwesomeIcon
            id={elementId}
            icon={mode.icon}
            onClick={toggleMode}
            color={mode.iconColor}
            title={mode.iconTitle}
            className={"clickable"}
        />
    );
}

export default ToggleThemeBtn;