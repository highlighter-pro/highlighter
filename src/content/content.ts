import log from "../utils/log";
import keyFromUrl from "../utils/keyFromUrl";
import messageType from "../messages/messageType";
import markAllHighlightsOnPage from "./markAllHighlightsOnPage";
import removeAllHighlights from "./removeAllHighlights";
import removeHighlightById from "./removeHighlightById";
import highlightSelection from "./highlightSelection";

const contentScriptName = "[content.ts] ";
log.info(contentScriptName + "started"); // see 'service worker' console from extension

// ============================  run when markAllHighlightsOnPage() page is opened or changed
// (1) page opened
markAllHighlightsOnPage(); // page opened > works

// (2) storage changed
// const tabUrl = window.location.href;
// if (tabUrl) {
//     chrome.storage.local.onChanged.addListener((changes) => {
//         const tabUrlAsKey = keyFromUrl(tabUrl);
//         if (tabUrlAsKey) {
//             if (changes[tabUrlAsKey]) {
//                 removeAllHighlights();
//                 markAllHighlightsOnPage();
//             }
//         }
//     });
// }

// ===========================     process messages

chrome.runtime.onMessage.addListener((
    message: messageType,
    sender,
    sendResponse
) => {
    // (!!!) you should use chrome.tabs.sendMessage(tabId, message); to send message to content script
    if (message && message.action) {
        switch (message.action) {
            // (1)
            case "highlightSelection":
                highlightSelection(message);
                break;

            // (2)
            case "navigateToHighlightId":

                if (message.highlightId) {

                    const querySelector = `*[data-highlightId='${message.highlightId}']`;

                    // https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
                    // returns the first Element within the document that matches the specified selector, or group of selectors.
                    // If no matches are found, null is returned.
                    const element = document.querySelector<HTMLElement>(querySelector);

                    if (element) {
                        // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
                        element.scrollIntoView({
                            behavior: "instant",
                            block: "center",
                            inline: "center"
                        });
                    }
                } else {
                    log.info(contentScriptName + "navigateToHighlightId: (message.highlightId) is false");
                }
                break;

            // (3)
            case "removeAllHighlights":
                const key = keyFromUrl(window.location.href);
                if (key) {
                    chrome.storage.local.remove(key);
                    removeAllHighlights();
                }
                break;

            // (4)
            case "removeHighlightById":
                if (message.highlightId) {
                    removeHighlightById(message.highlightId); // also removes from storage
                } else {
                    console.log(contentScriptName + "case removeHighlightById: (message.highlightId) is false");
                }
                break;

            // (5) this tab is highlighted (activated)
            case "tabHighlighted":
                // update all highlight spans on page
                // TODO: check if storage changed
                removeAllHighlights();
                markAllHighlightsOnPage();
                break;

            // (6) note added
            case "updateHighlights":
                // update all highlight spans on page
                // TODO: check if storage changed
                removeAllHighlights();
                markAllHighlightsOnPage();
                break;

            default:
                log.error("no func for message.action: " + message.action);
                break;

        } // end of switch
    } // enf of if (message && message.action)
}); // end of chrome.runtime.onMessage.addListener
