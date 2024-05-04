import React, {useContext} from "react";
import Btn from "../../theme/Btn";
import {HighlightsArrayContext, TabIdContext} from "../App";
import messageType from "../../messages/messageType";
import {devMode} from "../../constants";

type footerPropsType = {
    id?: string
};

const Footer: React.FC<footerPropsType> = (props) => {
    // const funcName = "[Footer] ";

    const highlightsArraySize = useContext(HighlightsArrayContext).highlightsArray.length;
    const tabId = useContext(TabIdContext).tabId;

    const id = props.id || "Footer";

    return (
        <footer id={id}>

            {highlightsArraySize > 0 ?
                <div>
                    <hr/>
                    <Btn
                        id={"removeAllBtn"}
                        // icon={faTrashCan}
                        btnText={"Remove all"}
                        onClickHandler={() => {
                            if (tabId) {
                                const message: messageType = {
                                    action: "removeAllHighlights"
                                };
                                chrome.tabs.sendMessage(tabId, message).catch(error => devMode ? console.log(error) : null);
                            }
                            // if (tabId) {
                            //
                            //     // chrome.storage.local.remove(key);
                            // }
                        }}
                    />
                </div>
                : null
            }

        </footer>
    );
};

export default Footer;