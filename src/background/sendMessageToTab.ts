import MessagesToContentActionsType from "../content/messagesToContentActionsType";
import {devMode} from "../constants";
import isWebPage from "../utils/isWebPage";

const sendMessageToTab = (
    tabId: number,
    messageAction: MessagesToContentActionsType,
) => {
    chrome.tabs.get(tabId)
        .then((tab: chrome.tabs.Tab) => {
            if (tab && tab.status && tab.status === "complete" && tab.url && isWebPage(tab.url)) {
                chrome.tabs.sendMessage(tabId, {
                    action: messageAction,
                }).catch((error) => {
                    devMode ? console.error(error) : null;
                });
            }
        })
        .catch(error => {
            devMode ? console.error(error) : null;
        });
};

export default sendMessageToTab;