FROM node:10-alpine

RUN mkdir /usr/src && \
    mkdir /usr/src/node_modules && \
    chown node:node -R /usr/src

WORKDIR /usr/src
USER node

COPY package*.json ./
RUN npm install

COPY . ./

ENTRYPOINT ["node", "index.js"]
