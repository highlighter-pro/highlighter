import {devMode} from "../constants";

const log = {
    info: (info: any) => {
        if (devMode) {
            console.info(info)
        }
    },
    warn: (warning: any) => {
        if (devMode) {
            console.warn(warning)
        }
    },
    error: (error: any) => {
        if (devMode) {
            console.error(error)
        }
    },
};

export default log;

