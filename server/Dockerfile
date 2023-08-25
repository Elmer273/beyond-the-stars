FROM node:latest

WORKDIR /server

COPY server .

RUN npm install
RUN npm install pm2 -g

CMD [ "pm2-runtime", "start", "ecosystem.config.cjs"]