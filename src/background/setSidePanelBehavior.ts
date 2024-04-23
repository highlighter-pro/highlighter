const setSidePanelBehavior = () => {
    chrome.sidePanel
        // https://developer.chrome.com/docs/extensions/reference/api/sidePanel#method-setPanelBehavior
        .setPanelBehavior({ // https://developer.chrome.com/docs/extensions/reference/api/sidePanel#type-PanelBehavior
            openPanelOnActionClick: true, // Defaults to false
        })
        .catch((error) => console.error(error));
};

export default setSidePanelBehavior;