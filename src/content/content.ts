import markAllHighlightsOnPage from "./markAllHighlightsOnPage";
import processMessagesToContent from "./processMessagesToContent";
// see
// https://stackoverflow.com/questions/49996456/importing-json-file-in-typescript
import manifest from "../../public/manifest.json";
import keyFromUrl from "../utils/keyFromUrl";
import removeAllHighlights from "./removeAllHighlights";

// const contentScriptName = "[content.ts] ";
console.info(manifest.name + " " + manifest.version + " content script started"); // see 'service worker' console from extension

// (1) run when page is opened or changed
// Note: The Tabs API (chrome.tabs) can be used by the service worker and extension pages, but not content scripts,
// thus we don't have access to chrome.tabs.onUpdated etc. here
// https://developer.chrome.com/docs/extensions/reference/api/tabs
// instead web get messages from background script and process them in src/content/processMessagesToContent.ts
// ( here we run processMessagesToContent() )

markAllHighlightsOnPage() // page opened > works
    // .then(r => {})
    .catch(error => console.log(error));

// (2) storage changed
const tabUrl = window.location.href;
if (tabUrl) {
    chrome.storage.local.onChanged.addListener((changes) => {
        const tabUrlAsKey = keyFromUrl(tabUrl);
        if (tabUrlAsKey) {
            if (changes[tabUrlAsKey]) {
                removeAllHighlights();
                markAllHighlightsOnPage()
                    .catch(error => console.log(error));
            }
        }
    });

}

// ===========================     process messages

processMessagesToContent();