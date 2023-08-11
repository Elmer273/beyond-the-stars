FROM node:latest

WORKDIR /socMed

COPY server /socMed/server

RUN cd server && npm install
RUN npm install pm2 -g

CMD [ "pm2-runtime", "start", "server/ecosystem.config.cjs"]