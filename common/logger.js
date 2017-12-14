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
const dir = "./log";

//--------------------------------------------------------------------------------------
// LOGGER FUNCTIONS 
//--------------------------------------------------------------------------------------
const isLogDirExist = (dir) => {
    try {
        fs.statSync(dir);
    } catch (err) {
        fs.mkdirSync(dir);
    }
};

isLogDirExist(dir);

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