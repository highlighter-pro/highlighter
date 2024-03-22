import React from "react";
import AppName from "./AppName";
import ToggleThemeBtn from "../../theme/ToggleThemeBtn";
import TabUrlKey from "./TabUrlKey";

const Header: React.FC = () => {

    const id = "Header";

    return (
        <header id={id}>
            <div>
                {/*
                see: https://stackoverflow.com/questions/28784099/css-float-right-moves-element-right-and-down-i-dont-want-down
                to prevent button falling down "the elements that you want to have floated right need to be given first in your html structure"
                */}
                <ToggleThemeBtn/>
                <AppName/>
            </div>
            <hr/>
            <TabUrlKey/>
            <hr/>
        </header>
    );
}

export default Header;