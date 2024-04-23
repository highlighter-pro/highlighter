import contextMenusOnClicked from "./contextMenu/contextMenusOnClicked";
import setSidePanelBehavior from "./setSidePanelBehavior";
import addMenuItems from "./contextMenu/addMenuItems";
import addOnMessageListener from "./addOnMessageListener";
import detectActiveTab from "./detectActiveTab";

// -----  set side panel behavior
setSidePanelBehavior();

// ----- add menu items:
addMenuItems();

// ----- process messages
addOnMessageListener();

// ----- process clicks on menu items
contextMenusOnClicked();

// ------- send message to content script, when its tab is highlighted (activated)
detectActiveTab();


