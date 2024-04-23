import React, {useContext} from "react";
import {HighlightsArrayContext} from "../App";
import HighlightCard from "./HighlightCard";

const Main: React.FC = () => {

    // const funcName = "[Main]";

    const id = "Main";

    const highlightsArray = useContext(HighlightsArrayContext).highlightsArray;

    return (
        <main id={id}>
            {
                highlightsArray.map((
                    highlight,
                    // index,
                    // array
                ) => {
                    return (
                        <HighlightCard
                            highlight={highlight}
                            key={"key" + highlight.id}
                        />
                    );
                })
            }
        </main>
    );
};

export default Main;