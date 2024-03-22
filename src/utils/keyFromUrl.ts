/*
* Transform full URL to url.origin to (url.hostname) + (url.pathname),
* that will be used as a key for a value in Storage storing all highlights for the given webpage.
* see:
* https://stackoverflow.com/questions/5817505/is-there-any-method-to-get-the-url-without-query-string
* https://stackoverflow.com/a/75884674/1697878
* */

import log from "./log";

const keyFromUrl = (tabUrl: URL | string | undefined) => {

    const funcName = "[keyFromUrl] ";

    // log.info(funcName + "tabUrl:");
    // log.info(tabUrl);

    let key: string = "url not recognized";

    if (tabUrl) {

        let url: URL;

        if (typeof tabUrl === "string") { // (tabUrl instanceof String) does not work

            url = new URL(tabUrl);
            key = `${url.hostname}${url.pathname}`;

        } else if (tabUrl instanceof URL) {
            url = tabUrl;
            key = `${url.hostname}${url.pathname}`;
        } else {
            log.info(funcName + "tabUrl is not String or URL")
        }
        // return (url.hostname).concat(url.pathname);
    } else {

        log.info(funcName + "(tabUrl) is false");

    }

    // log.info(funcName + "key:");
    // log.info(key);

    return key;

};

export default keyFromUrl;