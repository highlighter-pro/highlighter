import React, {useContext, useEffect, useState} from "react";
import storedHighlightType from "../../storage/typesForStorage";
import {HighlightsArrayContext, ThemeContext} from "../App";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import Btn from "../../theme/Btn";
import addHighlightToStorage from "../../storage/addHighlightToStorage";

type notePropsType = {
    highlight: storedHighlightType,
    editModeOn?: boolean,
}
const Note: React.FC<notePropsType> = (props) => {

    const funcName = "[Note] ";

    const key = useContext(HighlightsArrayContext).key;
    const theme = useContext(ThemeContext).value; // "dark" | "light"

    const [noteText, setNoteText] = useState<string | undefined>();
    useEffect(() => {
        setNoteText(props.highlight.note);
    }, [props.highlight.note]);

    const [editModeOn, setEditModeOn] = useState<boolean>(props.editModeOn || false);

    return (

        <div id={props.highlight.id + "_note"} className={"note"}>

            {
                /* set textarea 'rows' attribute value to match the number of lines in the note text
                see: https://stackoverflow.com/questions/8488729/how-to-count-the-number-of-lines-of-a-string-in-javascript
                */
            }
            {editModeOn ?
                <textarea
                    id={props.highlight.id + "_note_TextArea"}
                    className={"note_TextArea" + " " + theme}
                    value={noteText}
                    onChange={(e) => {
                        setNoteText(e.target.value);
                    }}
                    rows={noteText ? noteText.split(/\r\n|\r|\n/).length : 3}
                ></textarea>
                :
                <div id={"highlightId_" + props.highlight.id + "_noteText"}
                     className={"noteText" + " " + theme}
                >

                    {(props.highlight && props.highlight.note) ?
                        <Markdown remarkPlugins={[remarkGfm]}>
                            {props.highlight.note}
                        </Markdown>
                        : <div><br/></div>
                    }

                </div>
            }

            <div className={"noteButtons"}>
                {editModeOn ?
                    <Btn id={"saveNoteBtn" + props.highlight.id}
                         btnText={"Save"}
                         onClickHandler={() => {
                             if (key) {
                                 const updatedHighlight: storedHighlightType = {...props.highlight};
                                 updatedHighlight.note = noteText;

                                 addHighlightToStorage(key, props.highlight.id, updatedHighlight)
                                     .catch(error => console.log(error));
                                 // this trigger chrome.storage.local.onChanged in content.ts

                                 // TODO: removed in ver. 1.1.1.
                                 // getCurrentTab().then((tab) => {
                                 //     if (tab && tab.id) {
                                 //         const message: messageType = {
                                 //             action: "updateHighlights"
                                 //         };
                                 //         return chrome.tabs.sendMessage(tab.id, message);
                                 //     } else {
                                 //         console.log("(tab && tab.id) is false");
                                 //     }
                                 // }).catch((error) => {
                                 //     console.log(error);
                                 // })

                             } else {
                                 console.error(funcName + "(key) is false in saveNoteBtn");
                             }
                             setEditModeOn(false);
                         }}/>
                    :
                    <Btn id={"editNoteBtn" + props.highlight.id}
                         btnText={noteText ? "Edit note" : "Add note"}
                         onClickHandler={() => {
                             setEditModeOn(true);
                         }}
                    />
                }

                {editModeOn ?
                    <Btn id={"cancelEditNoteBtn" + props.highlight.id}
                         btnText={"Cancel"}
                         onClickHandler={() => {
                             setEditModeOn(false);
                         }}/>
                    : null
                }

                {(noteText) ?
                    <Btn id={"copyNoteBtn" + props.highlight.id}
                         btnText={"Copy"}
                         onClickHandler={() => {
                             navigator.clipboard.writeText(noteText)
                                 .catch(error => console.log(error));
                         }}/>
                    : null
                }

                {(noteText) ?
                    <Btn id={"deleteNoteBtn" + props.highlight.id} btnText={"Delete note"} onClickHandler={() => {
                        if (key) {
                            const updatedHighlight: storedHighlightType = {...props.highlight};
                            delete updatedHighlight.note;
                            addHighlightToStorage(key, props.highlight.id, updatedHighlight)
                                .catch(error => console.log(error));
                        } else {
                            console.log(funcName + "(key) is false in deleteNoteBtn");
                        }
                    }}/>
                    : null
                }

            </div>

        </div>
    );
};

export default Note;