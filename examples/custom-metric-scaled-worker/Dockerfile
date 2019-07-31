FROM node:10-alpine

RUN mkdir /usr/src && \
    mkdir /usr/src/node_modules && \
    chown node:node -R /usr/src

WORKDIR /usr/src
USER node

COPY . ./

EXPOSE 3000
ENTRYPOINT ["node", "index.js"]
