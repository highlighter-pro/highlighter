import {defaultHighlightColor, devMode} from "../../constants";
import contextMenuItems from "./contextMenuItems";
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

                // (1) Highlight
                case contextMenuItems.highlightAction.id:
                    chrome.tabs.sendMessage(tab.id, {
                        action: "highlightSelection",
                        color: defaultHighlightColor, // TODO: add 'change color' functionality
                    }).catch((error) => {
                        console.error(funcName);
                        console.error(error);
                    });
                    break;

                // (2) Delete highlight
                case contextMenuItems.deleteHighlight.id:
                    chrome.tabs.sendMessage(
                        tab.id,
                        {
                            action: "removeHighlightById",
                            highlightId: backgroundState.currentHighlightId,
                        }
                    ).catch(error => console.error(error));
                    break;

                // (*) add note
                // case contextMenuItems.addNote.id:
                //     chrome.tabs.sendMessage(
                //         tab.id,
                //         {
                //             action: "addNote",
                //             highlightId: backgroundState.currentHighlightId,
                //         }
                //     ).catch(error => console.error(error));
                //     break;

                //
                default:
                    console.log("no func for " + onClickData.menuItemId);
                    break;
            } // end of switch
        } else {
            devMode ? console.error("(onClickData && onClickData.menuItemId && onClickData.pageUrl && tab && tab.id && tab.url) is false") : null;
        } // end of if (onClickData && onClickData.menuItemId ...)
    }); // end of chrome.contextMenus.onClicked.addListener ...
}

export default contextMenusOnClicked;
