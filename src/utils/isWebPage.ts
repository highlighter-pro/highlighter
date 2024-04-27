const isWebPage = (urlStr: string) => {
    try {
        const url = new URL(urlStr);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch (error) {
        return false;
    }
};

export default isWebPage;