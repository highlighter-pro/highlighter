export type storedHighlightType = {
    id: string, // here we repeat id, this makes easier transformation to an array
    highlightedText: string,
    rangeSerialized: string,
    timestamp: number,
    commonAncestorContainerSerialized?: string,
    color?: string,
    note?: string,
};

export type storedHighlightsWithKeysType = {
    [key: string]: storedHighlightType,
};

export type storageObjectForTabUrlType = {
    [key: string]: storedHighlightsWithKeysType,
}

export default storedHighlightType;