FROM armdocker.rnd.ericsson.se/dockerhub-ericsson-remote/node:14.17.1-alpine

# Fix vulnerability issues by updating all critical packages manually
RUN apk --no-cache upgrade

# Set up workspace
WORKDIR /app
RUN chown node:node /app
USER node

## The copy proces was separated into two stages, so that the NPM install stage stays cached unless package.json changes
## This way, changes to the code base itself won't cause a cache miss for npm install.
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

## Next copy the rest of the app and then run the build
COPY . /app
RUN npm run build


EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
