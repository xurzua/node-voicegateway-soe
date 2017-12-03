//--------------------------------------------------------------------------------------
// IMPORTS 
//--------------------------------------------------------------------------------------

const restify = require('restify');
const conversation = require('./conversation');
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
    name: 'Service Orchestation Engine',
    version: '2.1.0',
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

    let data = request.body;
    let workspaceID = request.params.workspaceID;

    log.warn('\n[IN] VoiceGateway Request: <---\n\n', data, '\n');
    conversation.setConversationMessage(workspaceID, data, response);

});

server.post('/v1/rest/logger', function (request, response) {

});

//--------------------------------------------------------------------------------------
// SERVER INITIALIZATION
//--------------------------------------------------------------------------------------

server.listen(SOE_SETTINGS.listenPort, function () {
    log.debug('[SOE] Version 2.1.0 (dev)');
    log.debug('[SOE] Configuration file parsed sucessfully');
    log.debug('[SOE] Startup Complete. Listening at %s', server.url);
});