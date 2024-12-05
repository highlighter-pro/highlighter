import {defaultHighlightColor, markedTextClassName} from "../constants";
import messageType from "../messages/messageType";

export function highlightMouseOverListenerFunc(this: HTMLElement) {
    const highlightId = this.getAttribute("data-highlightId");
    if (highlightId) {
        const message: messageType = {
            action: "highlightMouseOver",
            highlightId: highlightId,
        }
        chrome.runtime.sendMessage(message) // >> for context menu (background script)
            .catch(error => console.log(error));
    }
}

export function highlightMouseOutListenerFunc() {
    const message: messageType = {action: "highlightMouseOut",};
    chrome.runtime.sendMessage(message)
        .catch(error => console.log(error));
}

const highlightRange = (highlightId: string, range: Range, highlightColor?: string, title?: string) => {

    // const temporaryColor = "#010203"; // > design mode will transform this to background-color: rgb(1, 2, 3);
    // NOTE: spaces are important if using this string in document.querySelectorAll
    const temporaryColor = "rgba(1, 2, 3, 0.01)";

    const selection: Selection = window.getSelection() || new Selection();
    selection.removeAllRanges();
    selection.addRange(range);

    // const selectedText = selection.toString();

    document.designMode = "on";
    document.execCommand("HiliteColor", false, temporaryColor);
    selection.removeAllRanges();
    document.designMode = "off";

    // >>> Find all elements marked with temporary color:
    // https://stackoverflow.com/questions/64007739/select-all-elements-with-a-certain-color
    const nodesList = [...document.querySelectorAll<HTMLElement>('*')] // ! here we have not only <span>s
        .filter(element => getComputedStyle(element).backgroundColor === temporaryColor);

    // >>> change temporary color to highlight color and add required attributes
    nodesList.forEach((
        element: HTMLElement,
        // index: number,
        // parent: HTMLElement[]
    ) => {

        // mark as highlighted text by the class name for all highlights
        element.classList.add(markedTextClassName);

        // change temporary color to  highlight color
        // https://stackoverflow.com/questions/38454240/using-css-important-with-javascript
        element.style.setProperty("background-color", `${highlightColor || defaultHighlightColor}`, "important");

        if (title) {
            element.setAttribute("title", title);
        }

        element.setAttribute("data-highlightId", highlightId);

        // https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event
        element.addEventListener("mouseover", highlightMouseOverListenerFunc);

        // https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event
        element.addEventListener("mouseout", highlightMouseOutListenerFunc);

    });

};

export default highlightRange;