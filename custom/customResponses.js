//--------------------------------------------------------------------------------------
// IMPORTS 
//--------------------------------------------------------------------------------------

const logger = require('../common/logger');

//--------------------------------------------------------------------------------------
// GLOBAL VARIABLES 
//--------------------------------------------------------------------------------------

const log = logger.log;

//--------------------------------------------------------------------------------------
// CUSTOM RESPONSES 
//--------------------------------------------------------------------------------------

var customHangUp = (params) => {

    let vgwActHangup = {
        'context': {
            'vgwByeCustomHeader': 'User-To-User',
            'vgwByeCustomHeaderVal': params.transferTarget
        },
        'output': {
            'vgwActionSequence': [{
                'command': 'vgwActPlayText',
                'parameters': {
                    'text': [
                        'OK, Im going to transfer you now to a Contact Center agent, please wait on line'
                    ]
                }
            },
            {
                'command': 'vgwActHangUp'
            }

            ]
        }
    };

    log.warn('\n[SOE] Sending custom Response to VoiceGateway: --->\n\n', vgwActHangup, '\n');
    return vgwActHangup;
};

//--------------------------------------------------------------------------------------
// EXPORTS 
//--------------------------------------------------------------------------------------

module.exports = {
    customHangUp
};