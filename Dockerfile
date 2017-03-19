FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install --production

# Bundle app source
COPY . /usr/src/app

EXPOSE 7002
CMD [ "npm","run","prod" ]