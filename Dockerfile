FROM node:20.11.0-alpine3.19 as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN npm run build

RUN rm -rf node_modules && \
  NODE_ENV=production npm install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

FROM node:20.11.0-alpine3.19

WORKDIR /usr/src/app/

COPY --from=builder /usr/src/app/  .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "npm", "start" ]
