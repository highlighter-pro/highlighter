import React, {useContext} from "react";
import {HighlightsArrayContext} from "../App";

const TabUrlKey: React.FC = () => {

    // const funcName = "[TabUrlKey]";

    const elementId = "TabUrlKey"
    const key = useContext(HighlightsArrayContext).key;


    return (
        <div id={elementId} title={key}>
            {key ? key : "page URL undefined"}
        </div>
    );
};

export default TabUrlKey;