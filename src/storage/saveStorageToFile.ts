/*
* see:
* [Chrome Extension: Local Storage, how to export](https://stackoverflow.com/questions/23160600/chrome-extension-local-storage-how-to-export)
* [How to export localstorage using JSON](https://groups.google.com/a/chromium.org/g/chromium-extensions/c/AzO_taH2b7U)
* */

// see
// https://stackoverflow.com/questions/49996456/importing-json-file-in-typescript
import manifest from "../../public/manifest.json";

const saveStorageToFile = () => {
    chrome.storage.local.get(null, // null implies all items
        (data) => {
            if (data) {
                data["_version"] = manifest.version;
                data["_timeStamp"] = Date.now();
                const fileName = "highlighter_pro_backup_" + Date.now() + ".json";
                const dataStr = JSON.stringify(data);
                const blob = new Blob([dataStr], {type: 'application/json'});
                const url = URL.createObjectURL(blob);

                // https://developer.chrome.com/docs/extensions/reference/api/downloads
                // You must declare the "downloads" permission in the extension manifest to use chrome.downloads API
                chrome.downloads.download({
                    url: url,
                    filename: fileName,
                }).catch(error => console.log(error));
            } else {
                console.log("No data stored in chrome.storage.local");
            }
        }
    );
};

export default saveStorageToFile;