import storedHighlightType, {storageObjectForTabUrlType, storedHighlightsWithKeysType} from "./typesForStorage";

const addHighlightToStorage = async (
    keyTabUrl: string,
    highlightId: string,
    storedHighlightObj: storedHighlightType
) => {

    let storageObjectForTabUrl: storageObjectForTabUrlType = await chrome.storage.local.get(keyTabUrl);

    let storedHighlightsWithKeys: storedHighlightsWithKeysType;

    if (storageObjectForTabUrl && storageObjectForTabUrl[keyTabUrl]) { // if there are stored highlights for this url already
        // valueObj = JSON.parse(data[key]); // not needed, data[key] is an object
        storedHighlightsWithKeys = storageObjectForTabUrl[keyTabUrl];
    } else { // no previously stored highlights for this url
        storedHighlightsWithKeys = {};
    }

    storedHighlightsWithKeys[highlightId] = storedHighlightObj;

    const newData: storageObjectForTabUrlType = {};
    newData[keyTabUrl] = storedHighlightsWithKeys;

    return chrome.storage.local.set(newData);
};

export default addHighlightToStorage;