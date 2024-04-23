import React, {ChangeEvent} from "react";

/*
* see:
* https://medium.com/@blessingmba3/building-a-file-uploader-with-react-11dba6409480
* */

const RestoreBackupButton: React.FC = () => {

    const fileInputElementId = "fileInput";

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {

        if (event && event.target && event.target.files && event.target.files.length > 0) {

            const file = event.target.files[0];

            console.info("file selected:");
            console.info(file.name);
            console.info(file.type);

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
                console.log(fileReader.error);
            };

            // load – no errors, reading complete.
            fileReader.onload = () => {

                console.info("typeof fileReader.result:");
                console.info(typeof fileReader.result);
                console.info(fileReader.result);

                if (fileReader.result && typeof fileReader.result === "string") {
                    const str = fileReader.result;
                    try {
                        const json = JSON.parse(str);
                        chrome.storage.local.set(json).then(() => {
                            console.info("chrome.storage.local updated");
                            const inputElement = document.getElementById(fileInputElementId) as HTMLInputElement;
                            inputElement.value = "";

                        }).catch((error) => {
                            console.info(error)
                        })

                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    console.log("(fileReader.result && typeof fileReader.result === \"string\") is false");
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