import {storageObjectForTabUrlType} from "./typesForStorage";

const removeHighlightFromStorage = async (
    key: string,
    highlightId: string,
) => {

    const storageObject: storageObjectForTabUrlType = await chrome.storage.local.get(key);

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
    delete storageObject[key][highlightId];

    // https://stackoverflow.com/questions/126100/how-to-efficiently-count-the-number-of-keys-properties-of-an-object-in-javascrip
    if (Object.keys(storageObject[key]).length > 0) {
        chrome.storage.local.set(storageObject)
    } else {
        chrome.storage.local.remove(key);
    }

};

export default removeHighlightFromStorage;