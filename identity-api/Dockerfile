FROM node:lts-slim

WORKDIR /usr/src/identity-api

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","run", "start"]