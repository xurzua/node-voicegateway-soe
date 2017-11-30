//--------------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------------

const fs = require('fs');
var settings = null;

//--------------------------------------------------------------------------------------
// SETTINGS FUNCTIONS
//--------------------------------------------------------------------------------------
var getSettings = () => {
    if (isSettingsFileExist()) {
        if (!isSettingsFileEmpty()) {
            return settings;
        }
    }

    throw ('There was a problem parsing the settings.json file. Check your settings.json file!');
};

var isSettingsFileExist = () => {
    try {
        fs.statSync('settings.json').isFile();
        settings = require('../settings.json');
        return true;
    } catch (err) {
        return false;
    }
};

var isSettingsFileEmpty = () => {

    if (isParameters(settings)) {
        Object.values(settings).forEach(key => {
            let parameters = key.parameters;
            Object.values(parameters).forEach(key => {
                if (isParameterObject(key)) {
                    if (isParameterObjectEmpty(key)) {
                        throw ('Check you settings.json file, there is a missing, null or undefined parameter in your configuration file');
                    }
                } else {
                    if (isParameterEmpty(key)) {
                        throw ('Check you settings.json file, there is a missing, null or undefined parameter in your configuration file');
                    }
                }
            });
        });
    }
    return false;
};

var isParameterObject = (obj) => {
    if (typeof obj === 'object') {
        return true;
    }
    return false;
};

var isParameterObjectEmpty = (obj) => {
    Object.values(obj).forEach(key => {
        if (key === null || key === undefined || key === "") {
            return true;
        }
    });
    return false;
};

var isParameters = (obj) => {

    let found = null;
    Object.values(obj).forEach(key => {
        if (key.hasOwnProperty('parameters')) {
            found = true;
        } else {
            found = false;
        }
    });

    return found;
};

var isParameterEmpty = (key) => {

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
