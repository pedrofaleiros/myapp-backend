FROM node:latest

WORKDIR /app

COPY .env ./
COPY tsconfig.json ./
COPY package*.json ./
COPY prisma ./prisma/

COPY . .

RUN yarn install

RUN yarn prisma generate

EXPOSE 3333

CMD yarn dev