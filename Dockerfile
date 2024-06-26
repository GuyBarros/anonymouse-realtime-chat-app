FROM --platform=linux/amd64 node:18
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
RUN apt-get update -y
RUN apt-get install nano vim -y
COPY . .

CMD [ "npm", "start" ]