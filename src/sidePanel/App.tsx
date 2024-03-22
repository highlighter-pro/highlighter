import React, {createContext, useEffect, useState} from 'react';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import getCurrentTab from "./getCurrentTab";
import keyFromUrl from "../utils/keyFromUrl";
import storedHighlightType, {storageObjectForTabUrlType} from "../storage/typesForStorage";

// https://dev.to/madv/usecontext-with-typescript-23ln
export type contextType = {
    value: string;
    setValue?: (value: string) => void, // or :Function
};

export type themeType = "dark" | "light";
export type themeContextType = {
    value: themeType;
    setValue?: (value: themeType) => void,
};

// https://react.dev/reference/react/createContext#createcontext
// Don’t forget to export your Context!
export type tabIdContextValueType = {
    tabId?: number,
    // setTabId?: (tabId: number | undefined) => void;
};

export type highlightsContextType = {
    key?: string,
    highlightsArray: storedHighlightType[],
};

export const TabIdContext: React.Context<tabIdContextValueType> = createContext<tabIdContextValueType>({});
export const HighlightsArrayContext: React.Context<highlightsContextType> = createContext<highlightsContextType>({highlightsArray: []});
export const ThemeContext: React.Context<themeContextType> = createContext<themeContextType>({value: "light"});

const App: React.FC = () => {

    const funcName = "[App] ";
    const componentId = "App";

    // https://react.dev/reference/react/createContext#provider
    const [theme, setTheme] = useState<"light" | "dark">('light');
    const [key, setKey] = useState<string>();
    // const [tab, setTab] = useState<chrome.tabs.Tab | undefined>();
    const [tabId, setTabId] = useState<number>();
    const [highlightsArray, setHighlightsArray] = useState<storedHighlightType[]>([]);

    // update key (from current page url) and tab id
    const updateCurrentTab = () => {
        getCurrentTab().then(tab => {
            if (tab) {
                if (tab.url) {
                    const newKey = keyFromUrl(tab.url);
                    if (newKey !== key) {
                        setKey(newKey);
                    }
                }
                if (tab.id && tab.id !== tabId) {
                    setTabId(tab.id);
                }
            }
        });
    };

    // update highlights array for current page url
    const updateHighlights = () => {
        if (key) {
            chrome.storage.local.get(key).then((result: storageObjectForTabUrlType) => {
                if (result && result[key]) {
                    const newHighlightsArray = Object.values(result[key]);
                    // https://stackoverflow.com/questions/7555025/fastest-way-to-sort-an-array-by-timestamp
                    newHighlightsArray.sort((a, b) => {
                        // return a.timestamp - b.timestamp; // will place the element with the lowest timestamp first
                        return b.timestamp - a.timestamp;
                    });
                    setHighlightsArray(newHighlightsArray);
                } else {
                    setHighlightsArray([]);
                }
            });
        }
    };

    // (1) panel opened
    useEffect(() => {
        updateCurrentTab();
    }, []);

    // (2) new tab is highlighted (activated)
    chrome.tabs.onHighlighted.addListener((
        // tabHighlightInfo: chrome.tabs.TabHighlightInfo,
    ) => {
        updateCurrentTab();
    });

    // (3) if tab is reloaded and tab url have changed
    chrome.tabs.onUpdated.addListener((
        // tabId: number,
        // tabChangeInfo: chrome.tabs.TabChangeInfo,
        // tab: chrome.tabs.Tab,
    ) => {
        updateCurrentTab();
    });

    // (1) if url changed
    useEffect(() => {
        updateHighlights()
    }, [key]);

    // (2) if new highlight is added
    chrome.storage.local.onChanged.addListener((changes) => {
        if (key && changes[key]) {
            if (changes[key].newValue) {
                const newHighlightsArray: storedHighlightType[] = Object.values(changes[key].newValue);
                // https://stackoverflow.com/questions/7555025/fastest-way-to-sort-an-array-by-timestamp
                newHighlightsArray.sort((a, b) => {
                    // return a.timestamp - b.timestamp; // will place the element with the lowest timestamp first
                    return b.timestamp - a.timestamp;
                });
                setHighlightsArray(newHighlightsArray);
            } else { // if no .newValue property
                setHighlightsArray([]);
            }
        }
    });

    return (
        <ThemeContext.Provider value={{value: theme, setValue: setTheme}}>
            <HighlightsArrayContext.Provider value={{key: key, highlightsArray: highlightsArray}}>
                <TabIdContext.Provider value={{tabId: tabId}}>
                    <div id={componentId} className={theme}>
                        <Header/>
                        <Main/>
                        <Footer/>
                    </div>
                </TabIdContext.Provider>
            </HighlightsArrayContext.Provider>
        </ThemeContext.Provider>
    )
        ;
};

export default App;