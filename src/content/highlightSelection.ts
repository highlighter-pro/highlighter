import {defaultHighlightColor, markedTextClassName} from "../constants";
import {serializeRange} from "range-serializer";
import createRandomId from "../utils/createRandomId";
import keyFromUrl from "../utils/keyFromUrl";
import storedHighlightType from "../storage/typesForStorage";
import addHighlightToStorage from "../storage/addHighlightToStorage";
import highlightRange from "./highlightRange";
import messageType from "../messages/messageType";

const highlightSelection = (message: messageType) => {

    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Selection/toString
        const selectedText = selection.toString();
        let range = selection.getRangeAt(0);

        // >>> do not highlight if range already contains highlighted text
        let doNotHighlight: boolean = false;
        const existingHighlights = document.getElementsByClassName(markedTextClassName);
        for (const existingHighlight of existingHighlights) {
            if (range.intersectsNode(existingHighlight)) {
                console.log("selected text already highlighted"); // works
                window.alert("Some part of selected text is already highlighted");
                doNotHighlight = true;
                break; // <<< terminates the current loop
            }
        }

        if (!doNotHighlight) {
            const rangeSerialized = serializeRange(range);
            const color = message.highlightColor || defaultHighlightColor;
            const highlightId = createRandomId();

            const url = new URL(window.location.href);
            const tabUrlAsKey = keyFromUrl(url);
            const timestamp = Date.now();

            if (tabUrlAsKey) {
                const highlightObj: storedHighlightType = {
                    id: highlightId,
                    highlightedText: selectedText,
                    color: color,
                    rangeSerialized: rangeSerialized,
                    timestamp: timestamp,
                };

                addHighlightToStorage(tabUrlAsKey, highlightId, highlightObj) // we do it here, not in background script
                    .catch(error => console.log(error));

                highlightRange(highlightId, range, color, selectedText);
            }
        }
    } else {
        console.error("(selection && !selection.isCollapsed) is false");
    }
};

export default highlightSelection;