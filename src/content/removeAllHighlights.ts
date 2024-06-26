import {markedTextClassName} from "../constants";
import removeHighlights from "./removeHighlights";

const removeAllHighlights = () => {

    // see:
    // https://www.w3.org/TR/2018/REC-selectors-3-20181106/#attribute-selectors
    // [att~=val] Represents an element with the att attribute whose value is a whitespace-separated list of words, one of which is exactly "val".
    // const querySelector = `span[class~='${markedTextClassName}']`; // not only <span>s !
    const querySelector = `*[class~='${markedTextClassName}']`;

    // const elementsList = [...document.querySelectorAll<HTMLElement>(querySelector)]; // < array
    removeHighlights(querySelector);
};

export default removeAllHighlights;

