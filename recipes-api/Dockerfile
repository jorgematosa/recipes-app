# DEV
FROM node:11-slim

RUN mkdir -p /server

WORKDIR /server

COPY package.json /server/

RUN npm install --only=prod

COPY ./ /server/

CMD node ./index.js

EXPOSE 3000
