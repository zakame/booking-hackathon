FROM node:6.5.0
MAINTAINER Kevin Velasco

COPY . /drunkery
WORKDIR /drunkery

RUN npm i -g create-react-app & npm i
RUN npm run build
CMD npm start
