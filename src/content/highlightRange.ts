import {defaultHighlightColor, markedTextClassName} from "../constants";
import messageType from "../messages/messageType";

export function highlightMouseOverListenerFunc(this: HTMLElement) {
    const highlightId = this.getAttribute("data-highlightId");
    if (highlightId) {
        const message: messageType = {
            action: "highlightMouseOver",
            highlightId: highlightId,
        }
        chrome.runtime.sendMessage(message); // >> for context menu (background script)
    }
}

export function highlightMouseOutListenerFunc() {
    const message: messageType = {action: "highlightMouseOut",};
    chrome.runtime.sendMessage(message);
}


const highlightRange = (highlightId: string, range: Range, highlightColor?: string, title?: string) => {

    // const temporaryColor = "#010203"; // > design mode will transform this to background-color: rgb(1, 2, 3);
    // NOTE: spaces are important if using this string in document.querySelectorAll
    const temporaryColor = "rgba(1, 2, 3, 0.01)";

    const selection = window.getSelection() || new Selection();
    selection.removeAllRanges();
    selection.addRange(range);

    const selectedText = selection.toString();

    document.designMode = "on";
    document.execCommand("HiliteColor", false, temporaryColor);
    selection.removeAllRanges();
    document.designMode = "off";

    // see:
    // https://stackoverflow.com/questions/62198282/select-element-from-nodelist-by-attribute-value
    // Document: querySelectorAll() method
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
    // The Document method querySelectorAll() returns a static (not live) NodeList
    // representing a list of the document's elements that match the specified group of selectors.
    // const nodesList = document.querySelectorAll("span[style='background-color: rgba(1, 2, 3, 0.01);']");
    const styleValue = `background-color: ${temporaryColor};`;

    // document.querySelectorAll(CSS selectors)
    // list of all <span> elements with selected text > not only <span>, design mode does not add <span> if
    // only <code> or <a> element selected, but adds style to this element
    // const querySelector = `span[style='${styleValue}']`;
    // const querySelector = `[style='${styleValue}']`;
    // [att~=val] Represents an element with the att attribute whose value is a whitespace-separated list of words, one of which is exactly "val".
    // const querySelector = `[style~='${styleValue}']`;
    // you can just pass the type of the elements that will be selected (<HTMLElement>), see:
    // https://stackoverflow.com/questions/58773652/ts2339-property-style-does-not-exist-on-type-element
    // const nodesList = document.querySelectorAll(querySelector);
    // const nodesList = document.querySelectorAll<HTMLElement>(querySelector);

    // >>> Find all elements marked with temporary color:
    // https://stackoverflow.com/questions/64007739/select-all-elements-with-a-certain-color
    const nodesList = [...document.querySelectorAll<HTMLElement>('*')] // ! here we have not only <span>s
        .filter(element => getComputedStyle(element).backgroundColor === temporaryColor);
    // log.info(nodesList);

    let anchorSet = false;

    // >>> change temporary color to highlight color and add required attributes
    nodesList.forEach((element, index, parent) => {

        // TODO: think
        // if (element.tagName !== "span") { // for <a> elements
        //     const span = document.createElement("span");
        //     span.appendChild(span);
        //     element.replaceWith(span);
        // }

        // mark first element of highlighted text for navigation // find the fist node instead
        // if (index === 0 && element.tagName === "span") {
        //     element.setAttribute("id", highlightFirstElementIdPrefix + highlightId);
        // }

        // set an anchor for navigation
        // if (!anchorSet) {
        //     if (!element.id) {
        //         element.setAttribute("id", highlightId);
        //     }
        // }

        // mark as highlighted text by the class name for all highlights
        element.classList.add(markedTextClassName);

        // change temporary color to  highlight color
        // element.style.backgroundColor = highlightColor || defaultHighlightColor;
        // element.setAttribute('style', `background-color:${highlightColor || defaultHighlightColor} !important;`);
        // https://stackoverflow.com/questions/38454240/using-css-important-with-javascript
        element.style.setProperty("background-color", `${highlightColor || defaultHighlightColor}`, "important");

        // element.setAttribute("title", title || selectedText);
        if (title) {
            element.setAttribute("title", title);
        }

        element.setAttribute("data-highlightId", highlightId);

        // https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event
        element.addEventListener("mouseover", highlightMouseOverListenerFunc);

        // https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event
        element.addEventListener("mouseout", highlightMouseOutListenerFunc);
    });

    // if anchor still not set
    // for example, if there is only <a> element selected with existing id
    // if (!anchorSet && nodesList && nodesList[0] && nodesList[0].parentElement && nodesList[0].parentElement) {
    //     let element: HTMLElement = document.createElement("span");
    //     element.setAttribute("id", highlightId);
    //     nodesList[0].parentElement.insertBefore(element, nodesList[0]);
    // }

};

export default highlightRange;