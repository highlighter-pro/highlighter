import React, {ChangeEvent} from "react";
import {devMode} from "../constants";

/*
* see:
* https://medium.com/@blessingmba3/building-a-file-uploader-with-react-11dba6409480
* */

const RestoreBackupButton: React.FC = () => {

    const fileInputElementId = "fileInput";

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {

        if (event && event.target && event.target.files && event.target.files.length > 0) {

            const file = event.target.files[0];

            if (devMode) {
                console.info("file selected:");
                console.info(file.name);
                console.info(file.type);
            }

            if (file.type !== 'application/json') {
                alert('Please select a JSON file.');
                return;
            }

            // if (file.size > 1024 * 1024) {
            //     alert('File size should not exceed 1MB.');
            //     return;
            // }

            // See https://javascript.info/file
            // for File and FileReader API
            const fileReader = new FileReader();

            fileReader.readAsText(file);

            fileReader.onerror = () => {
                console.log(fileReader.error);
            };

            // load – no errors, reading complete.
            fileReader.onload = () => {

                if (devMode) {
                    console.info("typeof fileReader.result:");
                    console.info(typeof fileReader.result); // string
                    console.info(fileReader.result); // file content
                }

                if (fileReader.result && typeof fileReader.result === "string") {
                    const str = fileReader.result;
                    try {
                        const json = JSON.parse(str);

                        // Save to storage:
                        chrome.storage.local.set(json)
                            .then(() => {
                                console.info("chrome.storage.local updated");
                                const inputElement = document.getElementById(fileInputElementId) as HTMLInputElement;
                                inputElement.value = "";
                            })
                            .catch((error) => {
                                console.info(error); // <<
                            })
                    } catch (error) {
                        console.log(error); // <<<
                    }
                } else {
                    devMode ? console.log("(fileReader.result && typeof fileReader.result === \"string\") is false") : null;
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