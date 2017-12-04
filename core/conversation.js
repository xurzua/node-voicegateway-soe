//--------------------------------------------------------------------------------------
// IMPORTS 
//--------------------------------------------------------------------------------------
const ConversationV1 = require('watson-developer-cloud/conversation/v1');
const server = require('restify');
const custom = require('../custom/customResponses');
const logger = require('../common/logger');
const config = require('../common/settings');

//--------------------------------------------------------------------------------------
// GLOBAL VARIABLES 
//--------------------------------------------------------------------------------------
const settings = config.getSettings();
const CONVERSATION_SETTINGS = settings.conversation.parameters;
const log = logger.log;

//--------------------------------------------------------------------------------------
// CONVERSATION FUNCTIONS
//--------------------------------------------------------------------------------------

/**
 *  Fetches the credentials of a Conversation instance by comparing the 
 *  req.params.workspaceID of the VoiceGateway POST message and the settings.conversation.parameters object
 *  defined in the settings.json file. If they match, then return an Object with the username and password.
 * 
 * @param {any} workspaceID 
 * @returns {Object} username, password
 */

const getConversationCredentials = (workspaceID) => {
    
    let username = null;
    let password = null;

    for (let i = 0; i < CONVERSATION_SETTINGS.length; i++) {
        if (CONVERSATION_SETTINGS[i].workspaceID === workspaceID) {
            username = CONVERSATION_SETTINGS[i].username;
            password = CONVERSATION_SETTINGS[i].password;
            break;
        } else {
            log.error('\n[IN] There are not credentials for the requested Conversation Workspace. Please check your settings.json file. <---\n');
        }
    }

    return {
        username,
        password
    };

};

const getConversationResponse = (res, response) => {

    if (isConversationResponseTransfer(res)) {
        response.send(custom.customHangUp(getConversationResponseParameters(res)));
    } else {
        log.warn('\n[OUT] WatsonConversation response is not a "vgwActTransfer" falling back to original response: --->\n');
        log.warn('\n[OUT] Sending Conversation response to VoiceGateway: --->\n\n', res, '\n');
        response.send(200, res);
    }

};

//TODO REFACTOR FUNCTION
const getConversationResponseParameters = (res) => {

    let params = null;

    if (isConversationResponseAction(res)) {
        if (isConversationResponseTransfer(res)) {
            let params = res.output.vgwAction.parameters;
            log.warn('\n[OUT] Transfer parameters: --->\n\n', params, '\n');
            return params;
        }
    }

    if (isConversationResponseSequence(res)) {
        if (isConversationResponseTransfer(res)) {
            let seq = res.output.vgwActionSequence;

            for (let i = 0; i < seq.length; i++) {
                if (seq[i].command === 'vgwActTransfer') {
                    params = seq[i].parameters;
                    log.warn('\n[OUT] Transfer parameters: --->\n\n', params, '\n');
                    break;
                }
            }

            return params;
        }
    }
};


const setConversationMessage = (workspaceID, data, response) => {

    let conversation = new ConversationV1({
        username: getConversationCredentials(workspaceID).username,
        password: getConversationCredentials(workspaceID).password,
        version_date: ConversationV1.VERSION_DATE_2017_05_26,
        headers: {
            'X-Watson-Learning-Opt-Out': true
        },

    });

    log.warn('\n[OUT] Sending VoiceGateway message to Conversation: --->\n\n', data, '\n');

    conversation.message({
        intents: data.intents,
        entities: data.entities,
        input: data.input,
        workspace_id: workspaceID,
        output: data.output,
        context: data.context

    }, (err, res) => {

        if (err) {
            log.error('\n[OUT] Error sending out message to Conversation: --->\n\n', err, '\n');
            response.send(500, err);
        } else {
            log.warn('\n[IN] Conversation Response: <---\n\n', res, '\n');
            getConversationResponse(res, response);
        }

    });
};

const isConversationResponseAction = (res) => {

    if ('vgwAction' in res.output) {
        log.warn('\n[IN] Conversation response is an "vgwAction": <---\n');
        return true;
    }
    return false;
};

const isConversationResponseSequence = (res) => {

    if ('vgwActionSequence' in res.output) {
        log.warn('\n[IN] Conversation response is an "vgwActionSequence": <---\n');
        return true;
    }
    return false;
};

//TODO REFACTOR FUNCTION
const isConversationResponseTransfer = (res) => {

    if (isConversationResponseAction(res)) {
        if (res.output.vgwAction.command === 'vgwActTransfer') {
            log.warn('\n[IN] Conversation response is an "vgwActTransfer": <---\n');
            return true;
        }
    }

    if (isConversationResponseSequence(res)) {

        let seq = res.output.vgwActionSequence;
        let found = false;

        for (let i = 0; i < seq.length; i++) {
            if (seq[i].command === 'vgwActTransfer') {
                found = true;
                log.warn('\n[IN] Conversation response is an "vgwActTransfer": <---\n');
                break;
            }
        }

        return found;
    }

    return false;
};

const isConversationResponseHangUp = (res) => {

    if (res.input.text === 'vgwHangUp') {
        log.warn('\n[OUT] Conversation sent a ' + res.input.text + ' request --->\n');
        return true;
    }
    return false;
};

//--------------------------------------------------------------------------------------
// EXPORTS 
//--------------------------------------------------------------------------------------

module.exports = {
    setConversationMessage
};