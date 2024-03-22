import clearStorage from "../storage/clearStorage";
import React from "react";

const RemoveAllButton: React.FC = () => {
    const onClickHandler = () => {
        clearStorage.all().then(() => {

        });
    };

    return (
        <button
            id={"removeAllBtn"}
            onClick={onClickHandler}
            className={"btn"}

        >
            Remove all highlights and notes
        </button>
    );
};

export default RemoveAllButton;