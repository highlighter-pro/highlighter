import contextMenuItems from "./contextMenuItems";

const addMenuItems = () => {

    chrome.runtime.onInstalled.addListener(() => {
        // https://developer.chrome.com/docs/extensions/reference/api/contextMenus
        chrome.contextMenus.create(contextMenuItems.highlightAction);
    });

};

export default addMenuItems;