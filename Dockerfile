FROM node:20.11.0-alpine3.19 as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install -g -s --no-progress yarn && \
    yarn && \
    yarn run build && \
    yarn cache clean

FROM node:20.11.0-alpine3.19

WORKDIR /usr/src/app/

COPY --from=builder /usr/src/app/  .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start" ]
