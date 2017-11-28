FROM node:carbon

WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --quiet

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8888

CMD [ "npm", "start" ]
