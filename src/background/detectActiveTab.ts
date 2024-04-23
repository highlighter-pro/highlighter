const detectActiveTab = () => {

    chrome.tabs.onActivated.addListener((tabActiveInfo: chrome.tabs.TabActiveInfo) => {
        if (tabActiveInfo && tabActiveInfo.tabId) {
            const tabId = tabActiveInfo.tabId;
            chrome.tabs.sendMessage(tabId, {
                active: "tabActivated"
            })
                // .then((response) => {
                //     //
                // })
                .catch((error) => {
                    console.error(error)
                });
        } else {
            console.log("(tabActiveInfo && tabActiveInfo.tabId) is false");
        }
    });

    chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo) => {
        if (tabId && changeInfo) {
            // TODO: check if receiving end exist before sending a message
            // Error: Could not establish connection. Receiving end does not exist
            chrome.tabs.sendMessage(tabId, {
                action: "tabUpdated",
            })
                // .then((response) => {
                //     //
                // })
                .catch((error) => {
                    console.error(error)
                });
        } else {
            console.log("(tabId && changeInfo) is false");
        }
    })

    chrome.tabs.onHighlighted.addListener((tabHighlightInfo: chrome.tabs.TabHighlightInfo) => {
        if (tabHighlightInfo && tabHighlightInfo.tabIds && tabHighlightInfo.tabIds[0]) {
            const tabId = tabHighlightInfo.tabIds[0];
            chrome.tabs.sendMessage(tabId, {
                action: "tabHighlighted",
            })
                // .then((response) => {
                //     //
                // })
                .catch((error) => {
                    console.error(error);
                })
        } else {
            console.log("(tabHighlightInfo && tabHighlightInfo.tabIds && tabHighlightInfo.tabIds[0]) is false");
        }
    });

};

export default detectActiveTab;