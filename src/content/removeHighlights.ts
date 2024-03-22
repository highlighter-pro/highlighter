import {highlightMouseOutListenerFunc, highlightMouseOverListenerFunc} from "./highlightRange";
import {markedTextClassName} from "../constants";
import log from "../utils/log";

const removeHighlights = (querySelector: string) => {

    const funcName = "[removeHighlights] ";

    // see:
    // https://stackoverflow.com/questions/18464432/how-to-remove-span-tag-from-the-string
    const elements = document.querySelectorAll<HTMLElement>(querySelector);

    elements.forEach(element => {

        element.removeEventListener("mouseover", highlightMouseOverListenerFunc);
        element.removeEventListener("mouseout", highlightMouseOutListenerFunc);

        if (element.tagName === "SPAN") { // ! upper case
            element.outerHTML = element.innerHTML;
        } else if (element.tagName === "A") { // ! upper case
            element.classList.remove(markedTextClassName);
            element.style.removeProperty("background-color"); // we can store this in 'data-old-background-color
            element.removeAttribute("title");
        } else {
            log.info(funcName + "this element can not be un-highlighted:");
            log.info(element);
        }

    });
}

export default removeHighlights;