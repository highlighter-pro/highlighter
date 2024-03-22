import React, {ChangeEvent} from "react";
import log from "../utils/log";

/*
* see:
* https://medium.com/@blessingmba3/building-a-file-uploader-with-react-11dba6409480
* */
const RestoreBackupButton: React.FC = () => {

    const fileInputElementId = "fileInput";

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {

        if (event && event.target && event.target.files && event.target.files.length > 0) {

            const file = event.target.files[0];

            log.info("file selected:");
            log.info(file.name);
            log.info(file.type);

            if (file.type !== 'application/json') {
                alert('Please select a JSON file.');
                return;
            }

            // if (file.size > 1024 * 1024) {
            //     alert('File size should not exceed 1MB.');
            //     return;
            // }

            // https://javascript.info/file
            //
            const fileReader = new FileReader();

            fileReader.readAsText(file);

            fileReader.onerror = () => {
                log.info(fileReader.error);
            };

            // load – no errors, reading complete.
            fileReader.onload = () => {

                log.info("typeof fileReader.result:");
                log.info(typeof fileReader.result);
                log.info(fileReader.result);

                if (fileReader.result && typeof fileReader.result === "string") {
                    const str = fileReader.result;
                    try {
                        const json = JSON.parse(str);
                        chrome.storage.local.set(json).then(() => {
                            log.info("chrome.storage.local updated");
                            const inputElement = document.getElementById(fileInputElementId) as HTMLInputElement;
                            inputElement.value = "";

                        }).catch((error) => {
                            log.info(error)
                        })

                    } catch (error) {
                        log.info(error);
                    }
                } else {
                    log.info("(fileReader.result && typeof fileReader.result === \"string\") is false");
                }
            }

        }

    };


    return (
        <>
            <input
                id={fileInputElementId}
                type="file"
                onChange={handleFileChange}
            />
        </>

    );
};

export default RestoreBackupButton;