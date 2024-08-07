FROM node:21-alpine

RUN apk add --no-cache  chromium --repository=http://dl-cdn.alpinelinux.org/alpine/v3.10/main

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/tmp
WORKDIR /usr/src/app

COPY . /usr/src/app/tmp

RUN cd ./tmp && yarn  && yarn build

RUN rm -rf /usr/src/app/tmp

# ENV HOST 0.0.0.0
EXPOSE 3000

# CMD ["/bin/sh"]
# CMD ["yarn", "start"]
ENTRYPOINT ["node", "./puppet-build/server/index.mjs"]
