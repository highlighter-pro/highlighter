import {highlightMouseOutListenerFunc, highlightMouseOverListenerFunc} from "./highlightRange";
import {markedTextClassName} from "../constants";

const removeHighlights = (querySelector: string) => {

    const funcName = "[removeHighlights] ";

    // see:
    // https://stackoverflow.com/questions/18464432/how-to-remove-span-tag-from-the-string
    const elements = document.querySelectorAll<HTMLElement>(querySelector);

    elements.forEach(element => {

        element.removeEventListener("mouseover", highlightMouseOverListenerFunc);
        element.removeEventListener("mouseout", highlightMouseOutListenerFunc);

        if (element.tagName === "SPAN" || element.tagName === "span") { // ! upper case
            element.outerHTML = element.innerHTML;
        } else if (element.tagName === "A" || element.tagName === "a") { // ! upper case
            element.classList.remove(markedTextClassName);
            element.style.removeProperty("background-color"); // we can store this in 'data-old-background-color
            element.removeAttribute("title");
        } else {
            console.log(funcName + "this element can not be un-highlighted:");
            console.log(element);
        }

    });
}

export default removeHighlights;