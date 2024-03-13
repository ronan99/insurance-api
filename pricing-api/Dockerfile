FROM node:lts-slim

WORKDIR /usr/src/pricing-api

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

CMD ["npm","run", "start"]