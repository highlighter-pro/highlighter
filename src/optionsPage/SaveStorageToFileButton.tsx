import React from "react";
import saveStorageToFile from "../storage/saveStorageToFile";

const SaveStorageToFileButton: React.FC = () => {

    const onClickHandler = () => {
        saveStorageToFile();
    }

    return (
        <button
            id={"saveStorageToFileBtn"}
            onClick={onClickHandler}
            className={"btn"}
        >
            Save backup
        </button>
    );

};

export default SaveStorageToFileButton;