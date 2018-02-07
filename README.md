# node-voicegateway-soe

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2a68a28fdb5949708d1ce9850d760783)](https://www.codacy.com/app/rfrobisher/node-voicegateway-soe?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rfrobisher/node-voicegateway-soe&amp;utm_campaign=Badge_Grade)

[David Badge](https://david-dm.org/rfrobisher/node-voicegateway-soe.svg)

Service Orchestration Engine (SOE) for the IBM Voice Gateway (VGW) written in Node.js using the Restify REST framework.
For more information and other useful examples built with Python or Java please visit:

* [IBM WASdev Github](https://github.com/WASdev/sample.voice.gateway/tree/master/soe) - The IBM WASdev Github page

## What's NEW

### 2.2.0 - Current Release

* 2.2.0   : Added '/reporting' endpoint for Voice Gateway event logging (CDR, Transcriptions, Conversation) using Apache CouchDB as database backend.

### 2.1.0

* 2.1.0   : Support for multiple Watson Conversation Workspaces (multi-tenant).
* 2.1.0-1 : Minor changes - Code refactoring.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Docker Deployment

Please read [Docker-README.md](doc/Docker-README.md) for details

## Installing from sources

### Prerequisites

* Node.js 8.9.x

Clone the repository onto your local machine:

```sh
git clone https://github.com/rfrobisher/node-voicegateway-soe.git
```

Go to the ```node-voicegateway-soe``` directory and install the project dependencies with npm

```sh
cd node-voicegateway-soe
npm install
```

### Setting your configuration

Rename the ```settings.dist.json``` file to ```settings.json```

```sh
mv settings.dist.json settings.json
```

Add your Watson Conversation credentials to ```settings.json``` file

```javascript
 "conversation": {
        "description": "Watson Conversation credentials",
        "parameters": {
            "username": "YOUR_CONVERSATION_USERNAME",
            "password": "YOUR_CONVERSATION_PASSWORD"
        }
    }
```

Wait, what about the Watson Conversation Workspace ID?

The SOE will use the ```WORKSPACE-ID``` sent by the IBM Voice Gateway, which is set in the ```WATSON_CONVERSATION_WORKSPACEID``` environment variable, for more information see:

* [IBM Voice Gateway](https://www.ibm.com/support/knowledgecenter/en/SS4U29/config.html) - The IBM Knowledge Center

### Running the Server

In the ```node-voicegateway-soe``` directory, start the server by running

```sh
npm start
```

### Adjust the logger timezone

To change the logger timezone export TZ as your local environment variable

```sh
export TZ=<YOUR_TIMEZONE_GOES_HERE>
```

## Built With

* [Restify](https://github.com/restify/node-restify) - Restify REST Framework
* [Bunyan](https://github.com/trentm/node-bunyan) - Bunyan JSON Logging Module
* [PouchDB](https://https://github.com/pouchdb/pouchdb) - PouchDB The database that syncs!
* [Watson Developer Cloud](https://github.com/watson-developer-cloud/node-sdk) - Watson Developer Cloud Node.js SDK

## Contributing

Please read [CONTRIBUTING.md](doc/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## Authors

* **Xavier Urzúa** - *Initial work* - [rfrobisher](https://github.com/rfrobisher)

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

* [IBM WASdev Github](https://github.com/WASdev/sample.voice.gateway/tree/master/soe) - The IBM WASdev Github page
