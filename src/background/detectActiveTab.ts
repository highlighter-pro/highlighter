// for background script

import sendMessageToTab from "./sendMessageToTab";

const detectActiveTab = () => {

    // (1) onActivated
    // https://developer.chrome.com/docs/extensions/reference/api/tabs#event-onActivated
    // Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired,
    // but you can listen to onUpdated events to be notified when a URL is set.
    // See:
    // ['active' tab VS. 'highlighted' tabs](https://groups.google.com/a/chromium.org/g/chromium-extensions/c/hEDShE5Dwe0):
    // > - An active tab is always highlighted. There is only one active tab per window. Careful, as explained in the
    // > doc, a tab can be active even if it's not in the focused window.
    // > - You can have several highlighted tabs in a same window. But then all highlighted tabs are not active.
    // > Example: select a tab, hold your Shift key, and select another tab. The last tab clicked will become the active
    // > tab for this window, but all tabs between them (including the two limit ones) are now highlighted.

    // TODO: removed in ver. 1.1.1.
    // chrome.tabs.onActivated.addListener((tabActiveInfo: chrome.tabs.TabActiveInfo) => {
    //     if (tabActiveInfo && tabActiveInfo.tabId) {
    //         sendMessageToTab(tabActiveInfo.tabId, "tabActivated");
    //     }
    // });

    // (2) onUpdated
    // https://developer.chrome.com/docs/extensions/reference/api/tabs#event-onUpdated
    // Fired when a tab is updated
    // It seems that the Chrome API does not support a filter (not documented at least)
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/onUpdated
    //
    // TODO: removed in ver. 1.1.1.
    // chrome.tabs.onUpdated.addListener((
    //     tabId: number,
    //     tabChangeInfo: chrome.tabs.TabChangeInfo //
    // ) => {
    //     if (tabId && tabChangeInfo && tabChangeInfo.status && tabChangeInfo.status === "complete") {
    //         sendMessageToTab(tabId, "tabUpdated");
    //     }
    // })

    // (*) onHighlighted
    // https://developer.chrome.com/docs/extensions/reference/api/tabs#event-onHighlighted
    // Fired when the highlighted or selected tabs in a window changes
    // chrome.tabs.onHighlighted.addListener((tabHighlightInfo: chrome.tabs.TabHighlightInfo) => {
    //     if (tabHighlightInfo && tabHighlightInfo.tabIds && tabHighlightInfo.tabIds[0]) {
    //         const tabId = tabHighlightInfo.tabIds[0];
    //         //
    //     }
    // });

};

export default detectActiveTab;