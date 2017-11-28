# Docker README

## Prerequisites

* docker 17.03.2 or latest
* docker-compose 1.8.0 or latest

## Setting your configuration

Asuming you already cloned the git repo, go to the ```node-voicegateway-soe``` directory and rename the ```settings.dist.json``` file to ```settings.json```

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

Also edit the ```docker-compose.yml``` file and add your timezone for the bunyan logger, if you leave it empty it will assume UTC as your local timezone:

```yaml
    environment:
      TZ: 'YOUR_TIMEZONE_GOES_HERE'
```

* Note: If you change the ```port``` definition of the ```docker-compose.yml``` file remember to change it also in the ```settings.json``` file

## Build and deploy

Build the SOE application image by running

```sh
docker-compose up -d
```

Check if the SOE is running using

```sh
docker ps
```

It should output something like this:

```sh
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                    NAMES
bd22ab89fd0a        soe:2.1.0           "npm start"         32 seconds ago      Up 25 seconds       0.0.0.0:8888->8888/tcp   node-voicegateway-soe
```
