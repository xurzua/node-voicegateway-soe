//--------------------------------------------------------------------------------------
// IMPORTS 
//--------------------------------------------------------------------------------------
const PouchDB = require('pouchdb');
const logger = require('../common/logger');
const config = require('../common/settings');

//--------------------------------------------------------------------------------------
// GLOBAL VARIABLES 
//--------------------------------------------------------------------------------------
const settings = config.getSettings();
const SOE_SETTINGS = settings.soe.parameters;
const COUCHDB_SETTINGS = settings.couchdb.parameters;
const log = logger.log;

const setDBLogMessage = (message) => {

    const db = setDBInstanceConnection();

    db.post(message).then((res) => {
        log.info('\n[SOE] VoiceGateway reporting event logged successfully : \n\n', res, '\n\n');
    }).catch((error) => {
        log.error(error);
    });

};

var isDBReportingEnabled = () => {

    if (SOE_SETTINGS.reporting === true) {
        return true;
    }
    return false;
};

const isDBInstanceProtocolSecure = () => {

    if (COUCHDB_SETTINGS.protocol === 'https') {
        return true;
    }

    return false;
};

const setDBInstanceConnection = () => {

    let url = COUCHDB_SETTINGS.protocol + '://' + COUCHDB_SETTINGS.host + ':' + COUCHDB_SETTINGS.port + '/' + COUCHDB_SETTINGS.database;

    if (isDBInstanceProtocolSecure()) {

        let db = new PouchDB(url, {
            auth: {
                username: COUCHDB_SETTINGS.username,
                password: COUCHDB_SETTINGS.password
            }
        });

        return db;
    }

    let db = new PouchDB(url);
    return db;

};

//--------------------------------------------------------------------------------------
// EXPORTS 
//--------------------------------------------------------------------------------------

module.exports = {
    setDBLogMessage,
    isDBReportingEnabled
};