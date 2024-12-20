// src/content/processMessagesToContent.ts

import messageType from "../messages/messageType";
import highlightSelection from "./highlightSelection";
import keyFromUrl from "../utils/keyFromUrl";
import removeAllHighlights from "./removeAllHighlights";
import removeHighlightById from "./removeHighlightById";
import {devMode} from "../constants";

const processMessagesToContent = () => {

    const funcName = "[processMessagesToContent] ";

    chrome.runtime.onMessage.addListener((
        message: messageType,
        // sender: chrome.runtime.MessageSender,
        // sendResponse
    ) => {
        // (!!!) you should use chrome.tabs.sendMessage(tabId, message); to send message to content script
        if (message && message.action) {

            switch (message.action) {

                case "highlightSelection":
                    highlightSelection(message);
                    break;

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
                        devMode ? console.log(funcName + "navigateToHighlightId: (message.highlightId) is false") : null;
                    }
                    break;

                case "removeAllHighlights":
                    const key = keyFromUrl(window.location.href);
                    if (key) {
                        chrome.storage.local.remove(key)
                            .catch(error => {
                                devMode ? console.log(error) : null;
                            });
                        removeAllHighlights();
                    }
                    break;

                case "removeHighlightById":
                    if (message.highlightId) {
                        removeHighlightById(message.highlightId); // also removes from storage
                    } else {
                        devMode ? console.log(funcName + "case removeHighlightById: (message.highlightId) is false") : null;
                    }
                    break;

                // this tab is activated
                // TODO: removed in ver. 1.1.1.
                // https://developer.chrome.com/docs/extensions/reference/api/tabs#event-onActivated
                // Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired,
                // but you can listen to onUpdated events to be notified when a URL is set.
                // case "tabActivated":
                //     // update all highlight spans on page
                //     // TODO: check if storage changed
                //     removeAllHighlights();
                //     markAllHighlightsOnPage().catch(error => {
                //         devMode ? console.log(error) : null;
                //     });
                //     break;

                //  tab is updated
                // TODO: removed in ver. 1.1.1.
                // case "tabUpdated":
                //     // update all highlight spans on page
                //     removeAllHighlights();
                //     markAllHighlightsOnPage().catch(error => {
                //         devMode ? console.log(error) : null;
                //     });
                //     break;

                // TODO: removed in ver. 1.1.1.
                // case "updateHighlights":
                //     // update all highlight spans on page
                //     // TODO: check if storage changed
                //     removeAllHighlights();
                //     markAllHighlightsOnPage().catch(error => {
                //         devMode ? console.log(error) : null;
                //     });
                //     break;

                default:
                    devMode ? console.error("no func for message.action: " + message.action) : null;
                    break;

            } // end of switch
        } // enf of if (message && message.action)
    }); // end of chrome.runtime.onMessage.addListener

};

export default processMessagesToContent;