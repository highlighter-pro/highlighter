import React from "react";
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type btnPropsType = {
    id: string,
    btnText: string,
    onClickHandler: () => void,
    icon?: IconDefinition,
    title?: string
};

type btnStyleType = {
    normal: React.CSSProperties,
    hover: React.CSSProperties,
}

const Btn: React.FC<btnPropsType> = (props) => {

    const funcName = "[Btn] ";

    // const theme = useContext(ThemeContext).value;

    // see:
    // https://stackoverflow.com/questions/28365233/inline-css-styles-in-react-how-to-implement-ahover
    // https://stackoverflow.com/a/57439691/1697878
    // const [hover, setHover] = useState<boolean>(false);

    return (
        <span
            id={props.id}
            className={"btn"}
            onClick={props.onClickHandler}
            // onMouseEnter={() => {
            //     setHover(true);
            // }}
            // onMouseLeave={() => {
            //     setHover(false);
            // }}
            // style={{
            //     ...style.normal,
            //     ...(hover ? style.hover : null)
            // }}
            title={props.title}
        >
            {props.icon ? <FontAwesomeIcon icon={props.icon} className={"btnIcon"}/> : null}
            {props.btnText}
        </span>
    );
};

export default Btn;