//--------------------------------------------------------------------------------------
// IMPORTS 
//--------------------------------------------------------------------------------------

const fs = require("fs");
const Logger = require("bunyan");
const config = require("../common/settings");

//--------------------------------------------------------------------------------------
// GLOBAL VARIABLES 
//--------------------------------------------------------------------------------------

const settings = config.getSettings();
const LOGGER_SETTINGS = settings.logger.parameters;

//--------------------------------------------------------------------------------------
// LOGGER FUNCTIONS 
//--------------------------------------------------------------------------------------
const isLogDirExist = () => {
    try {
        fs.statSync("./log");
    } catch (error) {
        fs.mkdirSync("./log");
    }
};

isLogDirExist();

const log = Logger.createLogger({
    name: "SOE",
    streams: [{
        stream: process.stdout,
        level: LOGGER_SETTINGS.logLevel
    },
    {
        path: LOGGER_SETTINGS.logFile,
        level: LOGGER_SETTINGS.logLevel,
        closeOnExit: LOGGER_SETTINGS.closeOnExit,
        count: LOGGER_SETTINGS.logCount,
        period: LOGGER_SETTINGS.logPeriod
    }
    ]
});


//--------------------------------------------------------------------------------------
// EXPORTS 
//--------------------------------------------------------------------------------------

module.exports = {
    log
};