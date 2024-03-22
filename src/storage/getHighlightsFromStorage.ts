import {storageObjectForTabUrlType} from "./typesForStorage";

const getHighlightsFromStorage = async (key: string) => {
    const storageObjectForTabUrl: storageObjectForTabUrlType = await chrome.storage.local.get(key);
    if (storageObjectForTabUrl && storageObjectForTabUrl[key]) {
        return storageObjectForTabUrl[key];
    }
};

export default getHighlightsFromStorage;