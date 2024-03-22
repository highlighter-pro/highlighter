import React, {useContext} from "react";
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
// https://fontawesome.com/v5/docs/web/use-with/react
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ThemeContext, themeContextType, themeType} from "../sidePanel/App";

type themedIconPropsType = {
    id?: string,
    icon: IconDefinition,
    onClickHandler?: () => void // or :React.MouseEventHandler // or :Function
    title?: string,
    clickable?: boolean,
    iconColor?: string
};

const ThemedIcon: React.FC<themedIconPropsType> = (props) => {

    // const funcName = "[ThemedIcon] ";

    const theme: themeType = useContext<themeContextType>(ThemeContext).value;

    let className: string = "themedIcon";
    if (props.clickable) {
        className = className + " clickable";
    }

    return (
        // https://fontawesome.com/v5/docs/web/use-with/react
        <FontAwesomeIcon
            id={props.id}
            className={className + " " + theme}
            icon={props.icon}
            onClick={props.onClickHandler}
            color={props.iconColor}
            title={props.title}
        />
    );
};

export default ThemedIcon;
