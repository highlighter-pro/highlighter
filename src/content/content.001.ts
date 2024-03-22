import {defaultHighlightColor, markedTextClassName} from "../constants";
import log from "../utils/log";
import createRandomId from "../utils/createRandomId";
import keyFromUrl from "../utils/keyFromUrl";
import {serializeRange} from "range-serializer";
import messageType from "../messages/messageType";
import storedHighlightType from "../storage/typesForStorage";
import addHighlightToStorage from "../storage/addHighlightToStorage";
import markAllHighlightsOnPage from "./markAllHighlightsOnPage";
import removeAllHighlights from "./removeAllHighlights";
import removeHighlightById from "./removeHighlightById";
import highlightRange from "./highlightRange";

const contentScriptName = "[content.ts] ";
log.info(contentScriptName + "started"); // see 'service worker' console from extension

// ============================  run when markAllHighlightsOnPage() page is opened or changed
// (1) page opened
markAllHighlightsOnPage(); // page opened > works
// (2) storage changed

const tabUrl = window.location.href;

// if (tabUrl) {
//     // remove this, instead clean and re-highlight when tab highlighted // TODO: ?
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
                            log.info("selected text already highlighted"); // works
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
                            addHighlightToStorage(tabUrlAsKey, highlightId, highlightObj); // we do it here, not in background script
                            highlightRange(highlightId, range, color, selectedText);
                        }
                    }
                } else {
                    log.error("(selection && !selection.isCollapsed) is false");
                }
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
            // case "updateHighlights":
            //     // update all highlight spans on page
            //     // TODO: check if storage changed
            //     removeAllHighlights();
            //     markAllHighlightsOnPage();
            //     break;

            default:
                log.error("no func for message.action: " + message.action);
                break;

        } // end of switch
    } // enf of if (message && message.action)
}); // end of chrome.runtime.onMessage.addListener
