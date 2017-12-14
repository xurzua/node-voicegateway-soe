//--------------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------------

const fs = require("fs");
var settings = null;

//--------------------------------------------------------------------------------------
// SETTINGS FUNCTIONS
//--------------------------------------------------------------------------------------
const getSettings = () => {
    if (isSettingsFileExist()) {
        if (!isSettingsFileEmpty()) {
            return settings;
        }
    }

    throw ("There is no configuration file in the current directory. Check if the settings.json file exist!");
};

const isSettingsFileExist = () => {
    try {
        fs.statSync("settings.json").isFile();
        settings = require("../settings.json");
        return true;
    } catch (err) {
        return false;
    }
};

const isSettingsFileEmpty = () => {

    if (isParameters(settings)) {
        Object.values(settings).forEach(key => {
            let parameters = key.parameters;
            Object.values(parameters).forEach(key => {
                if (isParameterObject(key)) {
                    if (isParameterObjectEmpty(key)) {
                        throw ("Check you settings.json file, there is a missing, null or undefined parameter in your configuration file");
                    }
                } else {
                    if (isParameterEmpty(key)) {
                        throw ("Check you settings.json file, there is a missing, null or undefined parameter in your configuration file");
                    }
                }
            });
        });
    }
    return false;
};

const isParameterObject = (obj) => {
    if (typeof obj === "object") {
        return true;
    }
    return false;
};

const isParameterObjectEmpty = (obj) => {
    Object.values(obj).forEach(key => {
        if (key === null || key === undefined || key === "") {
            return true;
        }
    });
    return false;
};

const isParameters = (obj) => {

    let found = null;
    Object.values(obj).forEach(key => {
        if (key.hasOwnProperty("parameters")) {
            found = true;
        } else {
            found = false;
        }
    });

    return found;
};

const isParameterEmpty = (key) => {

    if (key === null || key === undefined || key === "") {
        return true;
    }
    return false;
};

//--------------------------------------------------------------------------------------
// EXPORTS
//--------------------------------------------------------------------------------------

module.exports = {
    getSettings
};
