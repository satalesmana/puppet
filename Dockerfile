FROM node:lts-iron

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install && npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["npm", "start"]
