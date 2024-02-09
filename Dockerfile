FROM node:20.11.0-alpine3.19

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN apk add yarn && yarn install --production && yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "start"]
