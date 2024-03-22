// import getCurrentTabUrlAsKey001 from "../sidePanel/getCurrentTabUrlAsKey.001";

const clearStorage = {

    all: async () => {
        // with null > callback , not promise (?)
        chrome.storage.local.get(null, (result) => {
            if (result) {
                const allKeys = Object.keys(result);
                return chrome.storage.local.remove(allKeys);
            }
        });
    },

    key: async (key: string | string[]) => {
        return chrome.storage.local.remove(key);
    },

    // currentTab: async (key: string) => {
    //     if (key) {
    //         await chrome.storage.local.remove(key);
    //     }
    // }

};

export default clearStorage;