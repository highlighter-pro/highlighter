import {defaultHighlightColor} from "../../constants";
import contextMenuItems from "./contextMenuItems";
import messageType from "../../messages/messageType";
import backgroundState from "../backgroundState";

const contextMenusOnClicked = () => {

    const funcName = "[contextMenusOnClicked]";

    chrome.contextMenus.onClicked.addListener((
        // OnClickData : Information about the item clicked and the context where the click happened.
        // https://developer.chrome.com/docs/extensions/reference/api/contextMenus#type-OnClickData
        onClickData,
        // Tab: The details of the tab where the click took place. This parameter is not present for platform apps.
        // https://developer.chrome.com/docs/extensions/reference/api/tabs#type-Tab
        tab//
    ) => {
        if (onClickData && onClickData.menuItemId && onClickData.pageUrl && tab && tab.id && tab.windowId && tab.url) {

            switch (onClickData.menuItemId) {

                case contextMenuItems.highlightAction.id:
                    chrome.tabs.sendMessage(tab.id, {
                        action: "highlightSelection",
                        color: defaultHighlightColor, // TODO: add 'change color' functionality
                    }).catch((error) => {
                        console.error(funcName);
                        console.error(error);
                    });
                    break;

                case contextMenuItems.deleteHighlight.id:
                    const message: messageType = {
                        action: "removeHighlightById",
                        highlightId: backgroundState.currentHighlightId,
                    };
                    chrome.tabs.sendMessage(tab.id, message)
                        // .then(r => {
                        //     //
                        // })
                        .catch(error => console.error(error));
                    break;

                // case contextMenuItems.addNote.id:
                //     // https://developer.chrome.com/docs/extensions/reference/api/sidePanel#type-OpenOptions
                //     const sidePanelOpenOptions: chrome.sidePanel.OpenOptions = {
                //         tabId: tab.id,
                //     }
                //     chrome.sidePanel.open(sidePanelOpenOptions)
                //         .then((result) => {
                //             const message: messageType = {
                //                 action: "addNote",
                //                 highlightId: backgroundState.currentHighlightId
                //             }
                //             chrome.runtime.sendMessage(message);
                //         })
                //         .catch((error) => {
                //             log.info(funcName + "chrome.sidePanel.open Error:");
                //             log.info(error);
                //         })
                //     break;

                default:
                    console.log("no func for " + onClickData.menuItemId);
                    break;

            } // end of switch
        } else {
            console.error("(onClickData && onClickData.menuItemId && onClickData.pageUrl && tab && tab.id && tab.url) is false");
        } // end of if (onClickData && onClickData.menuItemId ...)
    }); // end of chrome.contextMenus.onClicked.addListener ...
}

export default contextMenusOnClicked;
