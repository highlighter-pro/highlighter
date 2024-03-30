import log from "../utils/log";
import contextMenusOnClicked from "./contextMenu/contextMenusOnClicked";
import contextMenuItems from "./contextMenu/contextMenuItems";
import messageType from "../messages/messageType";

export type backgroundStateType = {
    currentHighlightId: string | undefined,
};
export const backgroundState: backgroundStateType = {
    currentHighlightId: undefined
};

const backgroundScriptName = "[background.js] ";
// log.info(backgroundScriptName + "started"); // see 'service worker' console from extension

// ------- set side panel behavior
chrome.sidePanel
    // https://developer.chrome.com/docs/extensions/reference/api/sidePanel#method-setPanelBehavior
    .setPanelBehavior({ // https://developer.chrome.com/docs/extensions/reference/api/sidePanel#type-PanelBehavior
        openPanelOnActionClick: true, // Defaults to false
    })
    .catch((error) => log.error(error));

// ------------ add menu items:

chrome.runtime.onInstalled.addListener(() => {
    // https://developer.chrome.com/docs/extensions/reference/api/contextMenus
    chrome.contextMenus.create(contextMenuItems.highlightAction);

}); // end of chrome.runtime.onInstalled.addListener

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
                log.info(backgroundScriptName + "Error:");
                log.info(error);
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
                log.info(backgroundScriptName + "Error:");
                log.info(error);
            }
            break;

        default:
            log.info(backgroundScriptName + "no func for message:");
            log.info(message);
    }
});

contextMenusOnClicked();

// ------- send message to content script, when its tab is highlighted (activated)

chrome.tabs.onHighlighted.addListener((highlightInfo: chrome.tabs.TabHighlightInfo) => {
    if (highlightInfo && highlightInfo.tabIds && highlightInfo.tabIds[0]) {
        chrome.tabs.sendMessage(highlightInfo.tabIds[0], {
            action: "tabHighlighted",
        }).catch((error) => {
            log.info(error) // log.ts:6 Error: Could not establish connection. Receiving end does not exist. 
        })
    }
});
