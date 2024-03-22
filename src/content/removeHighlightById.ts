import log from "../utils/log";
import keyFromUrl from "../utils/keyFromUrl";
import removeHighlightFromStorage from "../storage/removeHighlightFromStorage";
import removeHighlights from "./removeHighlights";

const removeHighlightById = (highlightId: string) => {

    const funcName = "[removeHighlightById] ";

    if (highlightId) {
        const key = keyFromUrl(window.location.href);
        if (key) {
            // (1) remove from storage
            removeHighlightFromStorage(key, highlightId);

            // (2) remove highlight
            // https://www.w3.org/TR/2018/REC-selectors-3-20181106/#attribute-selectors
            // const querySelector = `span[data-highlightId='${highlightId}']`; // not <span>, we also have <a>
            const querySelector = `*[data-highlightId='${highlightId}']`;
            removeHighlights(querySelector);

        } else {
            log.info(funcName + "(key) is false");
        }
    } else {
        log.info(funcName + "(highlightId) is false")
    }
};

export default removeHighlightById;