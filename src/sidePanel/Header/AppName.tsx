import React from "react";

// see
// https://stackoverflow.com/questions/49996456/importing-json-file-in-typescript
import manifest from "../../../public/manifest.json";

type appNameValuesType = {
    name: string,
    version: string
}


const AppName: React.FC = () => {

    const elementId = "AppName";

    return (
        <div id={elementId}>
            {manifest.name}{" "}{"v."}{manifest.version}
        </div>
    );
};

export default AppName;