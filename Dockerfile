FROM node:18-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN yarn  && yarn build

# ENV HOST 0.0.0.0
EXPOSE 3000

# CMD ["yarn", "start"]
ENTRYPOINT ["node", ".output/server/index.mjs"]
