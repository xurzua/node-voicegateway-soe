FROM node:carbon
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --quiet
COPY . .
EXPOSE 8888
CMD [ "npm", "start" ]

