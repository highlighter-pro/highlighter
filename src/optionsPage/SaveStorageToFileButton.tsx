import React from "react";

const SaveStorageToFileButton: React.FC = () => {

    const onClickHandler = () => {
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