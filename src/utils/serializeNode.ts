// see:
// https://stackoverflow.com/questions/8914985/javascript-how-to-serialize-a-dom-element-as-a-string-to-be-used-later
// https://developer.mozilla.org/en-US/docs/Web/API/XMLSerializer

const serializeNode = (node: Node) => {
    const xmlSerializer = new XMLSerializer();
    return xmlSerializer.serializeToString(node);
}

export default serializeNode;