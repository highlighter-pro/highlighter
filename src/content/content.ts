import markAllHighlightsOnPage from "./markAllHighlightsOnPage";
import processMessagesToContent from "./processMessagesToContent";
// see
// https://stackoverflow.com/questions/49996456/importing-json-file-in-typescript
import manifest from "../../public/manifest.json";

// const contentScriptName = "[content.ts] ";
console.info(manifest.name + " " + manifest.version + " content script started"); // see 'service worker' console from extension

// ============================  run when markAllHighlightsOnPage() page is opened or changed
// (1) page opened
markAllHighlightsOnPage() // page opened > works
    // .then(r => {})
    .catch(error => console.log(error));

// (2) storage changed
// const tabUrl = window.location.href;
// if (tabUrl) {
//     chrome.storage.local.onChanged.addListener((changes) => {
//         const tabUrlAsKey = keyFromUrl(tabUrl);
//         if (tabUrlAsKey) {
//             if (changes[tabUrlAsKey]) {
//                 removeAllHighlights();
//                 markAllHighlightsOnPage();
//             }
//         }
//     });
// }

// ===========================     process messages
processMessagesToContent();