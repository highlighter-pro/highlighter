import MessagesToContentActionsType from "../content/messagesToContentActionsType";
import messagesToBackgroundActionsType from "../background/messagesToBackgroundActionsType";
import MessagesToSidePanelActionsType from "../sidePanel/MessagesToSidePanelActionsType";

type messageType = {
    action: MessagesToContentActionsType | messagesToBackgroundActionsType | MessagesToSidePanelActionsType,
    highlightId?: string,
    highlightColor?: string,
};

export default messageType;