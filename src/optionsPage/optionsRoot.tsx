import React from 'react';
// https://react.dev/reference/react-dom/client/createRoot
import {createRoot} from 'react-dom/client';
import App from "./App";

const root = createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);