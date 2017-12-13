//--------------------------------------------------------------------------------------
// IMPORTS 
//--------------------------------------------------------------------------------------

const restify = require('restify');
const cluster = require('cluster');
const conversation = require('./conversation');
const report = require('./reporting');
const logger = require('../common/logger');
const config = require('../common/settings');

//--------------------------------------------------------------------------------------
// GLOBAL VARIABLES 
//--------------------------------------------------------------------------------------

const settings = config.getSettings();
const SOE_SETTINGS = settings.soe.parameters;
const log = logger.log;

//--------------------------------------------------------------------------------------
// SERVER CONFIGURATION 
//--------------------------------------------------------------------------------------

const server = restify.createServer({
    name: 'Service Orchestration Engine',
    version: '2.2.0',
    certificate: null,
    key: null,
    formatters: null,
    log: log
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({
    mapParams: true
}));
server.use(restify.plugins.jsonBodyParser({
    mapParams: true
}));


//--------------------------------------------------------------------------------------
// SERVER ENDPOINTS
//--------------------------------------------------------------------------------------

server.post('/v1/workspaces/:workspaceID/message', function (request, response) {

    let message = request.body;
    let workspaceID = request.params.workspaceID;

    log.warn('\n[IN] VoiceGateway Request: <---\n\n', message, '\n');
    conversation.setConversationMessage(workspaceID, message, response);

});

server.post('/reporting', function (request, response) {

    if (report.isDBReportingEnabled()) {
        return new Promise((resolve, reject) => {

            let message = request.body;

            try {
                report.setDBLogMessage(message);
                resolve();
            } catch (error) {
                reject(log.error('\n[SOE] There was an error trying to log the incoming event : \n\n', error, '\n\n'));
            }

        });
    }

    response.send(503);
});


//--------------------------------------------------------------------------------------
// SERVER INITIALIZATION
//--------------------------------------------------------------------------------------

server.listen(SOE_SETTINGS.port, () => {

    log.debug('[SOE] ' + server.name + ' - Version 2.2.0 (dev)');
    log.debug('[SOE] Configuration file: \'settings.json\' parsed sucessfully.');

    if (report.isDBReportingEnabled()) {
        log.debug('[SOE] Voice Gateway event reporting is enabled at /reporting.');
    } else {
        log.debug('[SOE] Voice Gateway event reporting is disabled.');
    }

    log.debug('[SOE] Server Startup is completed.');
    log.debug('[SOE] Server is handling connections at %s.', server.url);
});