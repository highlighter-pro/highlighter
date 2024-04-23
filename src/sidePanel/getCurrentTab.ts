const getCurrentTab = async () => {
    // const funcName = "[getCurrentTab] ";

    // https://developer.chrome.com/docs/extensions/reference/api/tabs#get_the_current_tab
    const queryOptions = {active: true, lastFocusedWindow: true};
    const tabs = await chrome.tabs.query(queryOptions);

    // log.info(funcName + " tabs:");
    // log.info(tabs); // works
    // [
    //     {
    //         "active": true,
    //         "audible": false,
    //         "autoDiscardable": true,
    //         "discarded": false,
    //         "favIconUrl": "",
    //         "groupId": -1,
    //         "height": 965,
    //         "highlighted": true,
    //         "id": 253302492,
    //         "incognito": false,
    //         "index": 7,
    //         "lastAccessed": 1708002388575.839,
    //         "mutedInfo": {
    //             "muted": false
    //         },
    //         "pinned": true,
    //         "selected": true,
    //         "status": "complete",
    //         "title": "Extensions - Marker",
    //         "url": "chrome://extensions/?id=dedhbligfgagppbpokgondelnflpfekg",
    //         "width": 1525,
    //         "windowId": 253302484
    //     }
    // ]

    if (tabs && tabs.length > 0) {
        // if (tabs.length === 1) {
        return tabs[0];
        // } else {
        //     console.log("More than one tab is active"); // TODO: add code for this case
        // }
    } else {
        console.log("No active tab found!");
    }
}

export default getCurrentTab;