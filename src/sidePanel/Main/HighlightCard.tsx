import React, {useContext, useState} from "react";
import storedHighlightType from "../../storage/typesForStorage";
import ThemedIcon from "../../theme/ThemedIcon";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {faChevronDown, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {TabIdContext, ThemeContext, themeContextType, themeType} from "../App";
import messageType from "../../messages/messageType";
import Note from "./Note";

type highlightCardPropsType = {
    highlight: storedHighlightType,
};

const HighlightCard: React.FC<highlightCardPropsType> = (props) => {
    const funcName = "[HighlightCard]";

    const theme: themeType = useContext<themeContextType>(ThemeContext).value;
    const tabId = useContext(TabIdContext).tabId;

    const [showNote, setShowNote] = useState<boolean>(false);

    return (

        <div
            id={"card_" + props.highlight.id}
            className={"highlightCard" + " " + theme}
        >

            <div className={"cardHeader"}>
                {/*
            to prevent button falling down, the elements that you want to have floated right need to be given first in your html structure",
            see: https://stackoverflow.com/questions/28784099/css-float-right-moves-element-right-and-down-i-dont-want-down
            */}

                <div className={"highlightCard_Buttons"}>

                    <ThemedIcon
                        icon={showNote ? faChevronDown : faChevronRight}
                        clickable={true} title={"Show note"}
                        onClickHandler={() => {
                            setShowNote(!showNote);
                        }}
                    />

                    {" "}{" "}

                    <ThemedIcon icon={faTrashCan} clickable={true} title={"Delete"}
                                onClickHandler={() => {
                                    if (tabId) {
                                        const message: messageType = {
                                            action: "removeHighlightById",
                                            highlightId: props.highlight.id
                                        };
                                        chrome.tabs.sendMessage(tabId, message);
                                    }
                                }}
                    />

                </div>

                <div className={"card_highlightedText"}>
                <span
                    className={"clickable"}
                    title={"Click to navigate to highlight on page"}
                    onClick={() => {
                        if (tabId && props.highlight && props.highlight.id) {
                            const message: messageType = {
                                action: "navigateToHighlightId",
                                highlightId: props.highlight.id
                            };
                            chrome.tabs.sendMessage(tabId, message);
                        }
                    }}>
                    {props.highlight.highlightedText}
                </span>
                </div>
            </div>

            {showNote ? <Note highlight={props.highlight}/> : null}

        </div>
    );
};

export default HighlightCard;