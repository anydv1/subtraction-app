FROM node:14
# create work directory
WORKDIR /usr/src/subtraction-app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8083
CMD [ "node", "server.js" ]
