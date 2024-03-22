import React from 'react';
import SaveStorageToFileButton from "./SaveStorageToFileButton";
import ToggleThemeBtn from "../theme/ToggleThemeBtn";
import AppName from "../sidePanel/Header/AppName";
import RemoveAllButton from "./RemoveAllButton";
import RestoreBackupButton from "./RestoreBackupButton";

const App: React.FC = () => {
    return (
        <div id={"optionsPage"}>
            <header id={"optionsHeader"}>
                <div>
                    {/*
                    see: https://stackoverflow.com/questions/28784099/css-float-right-moves-element-right-and-down-i-dont-want-down
                    to prevent button falling down "the elements that you want to have floated right need to be given first in your html structure"
                    */}
                    <ToggleThemeBtn/>
                    <AppName/>
                </div>
                <hr/>
            </header>
            <main>
                <h2>Backups</h2>
                <h3>Save backup</h3>
                <p>
                    You can backup all your highlights and notes as file on your computer.
                    This file can be used to restore your highlights and notes on this or on another computer,
                    for example if you reinstall your browser.
                </p>
                <SaveStorageToFileButton/>
                <h3>Remove all highlights and notes</h3>
                <p>
                    Your can remove all your highlights and notes from this browser.
                    It's recommended to make a backup before, so you can restore them if needed.
                </p>
                <RemoveAllButton/>
                <h3>Restore backup from file</h3>
                <p>
                    Choose a previously saved file to restore your highlights and notes.
                </p>
                <RestoreBackupButton/>
            </main>

        </div>
    );

};

export default App;