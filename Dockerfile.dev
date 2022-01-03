FROM node:17.3.0

WORKDIR /usr/src/app

RUN apt-get update || : && apt-get install python -y
RUN apt-get install ffmpeg -y

COPY package*.json ./

RUN npm install
COPY . .
RUN npm run tsc

CMD [ "node", "./build/index.js" ]
