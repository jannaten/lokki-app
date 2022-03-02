FROM node:alpine

COPY ./ /frontend

RUN cd /frontend && npm install && npm audit fix

WORKDIR /frontend

CMD ["npm", "start"]
