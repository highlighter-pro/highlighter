/*
* see:
* https://stackoverflow.com/questions/23160600/chrome-extension-local-storage-how-to-export
* */

const saveStorageToFile = () => {

    chrome.storage.local.get(null, // null implies all items
        (data) => {

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
        }
    );
};

export default saveStorageToFile;