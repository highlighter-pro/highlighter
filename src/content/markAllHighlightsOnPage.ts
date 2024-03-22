import getHighlightsFromStorage from "../storage/getHighlightsFromStorage";
import {deserializeRange} from "range-serializer";
import highlightRange from "./highlightRange";
import keyFromUrl from "../utils/keyFromUrl";
import log from "../utils/log";

const markAllHighlightsOnPage = async () => {
    const funcName = "[markAllHighlightsOnPage] ";
    const urlStr = window.location.href;
    if (urlStr) {
        const key = keyFromUrl(urlStr);
        if (key) {
            const highlights = await getHighlightsFromStorage(key);
            if (highlights) {
                for (const [highlightId, storedHighlight] of Object.entries(highlights)) {
                    try {
                        const range = deserializeRange(storedHighlight.rangeSerialized);
                        highlightRange(highlightId, range, storedHighlight.color, storedHighlight.note);
                    } catch (error) {
                        log.info(funcName + "error restoring highlight " + highlightId + " on " + key + " :");
                        log.info(error);
                    }
                }
            }
        }
    }
};

export default markAllHighlightsOnPage;