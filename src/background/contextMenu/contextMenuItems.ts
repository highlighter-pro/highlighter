// https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns#examples
// do not show on chrome: , blob: , file: etc.
const showForPages = [
    "https://*/*",
    "https://*/",
    "http://*/*",
    "http://*/",
];

const selectionContext: chrome.contextMenus.ContextType = 'selection';
const allContext: chrome.contextMenus.ContextType = 'all';
const linkContext: chrome.contextMenus.ContextType = 'link';

type contextMenuItemsType = {
    // https://developer.chrome.com/docs/extensions/reference/api/contextMenus#type-CreateProperties
    [item: string]: chrome.contextMenus.CreateProperties
};

const contextMenuItems: contextMenuItemsType = {

    highlightAction:
        {
            id: "highlightAction",
            title: "Highlight",
            // https://developer.chrome.com/docs/extensions/reference/api/contextMenus#type-ContextType
            contexts: [selectionContext],
            // see:
            // https://stackoverflow.com/questions/20863005/chrome-extension-context-menu-on-specific-pages
            "documentUrlPatterns": showForPages
        },

    deleteHighlight:
        {
            id: "deleteHighlight",
            title: "Delete highlight",
            contexts: ["all", "link"] // 'link' is needed in addition to 'all'
        },

    // addNote:
    //     {
    //         id: "addNote",
    //         title: "Add note",
    //         contexts: ["all", "link"] // 'link' is needed in addition to 'all'
    //     },
}

export default contextMenuItems;