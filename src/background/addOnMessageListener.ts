import messageType from "../messages/messageType";
import contextMenuItems from "./contextMenu/contextMenuItems";
import backgroundState from "./backgroundState";
import {devMode} from "../constants";

const addOnMessageListener = () => {

    chrome.runtime.onMessage.addListener((message: messageType, sender, sendResponse) => {

        switch (message.action) {

            // (1)
            case "highlightMouseOver":
                // remove a context menu item before adding a new one to ensure safety
                // https://copyprogramming.com/howto/check-if-item-is-already-in-the-context-menu
                try {
                    backgroundState.currentHighlightId = message.highlightId;
                    chrome.contextMenus.create(contextMenuItems.deleteHighlight);
                    // chrome.contextMenus.create(contextMenuItems.addNote); // TODO: add this functionality
                } catch (error) {
                    devMode ? console.error(error) : null;
                }
                break;

            // (2)
            case "highlightMouseOut":
                try {
                    backgroundState.currentHighlightId = undefined;
                    // chrome.contextMenus.CreateProperties.id -> string
                    // chrome.contextMenus.remove menuItemId: string|number ...
                    // thus we need type assertion here
                    // https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions
                    chrome.contextMenus.remove(contextMenuItems.deleteHighlight.id as string);
                    // chrome.contextMenus.remove(contextMenuItems.addNote.id as string); // TODO: add this functionality
                } catch (error) {
                    devMode ? console.error(error) : null;
                }
                break;

            default:
                console.log(message);
        }
    });

};

export default addOnMessageListener;