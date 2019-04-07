# This file is a template, and might need editing before it works on your project.
FROM mhart/alpine-node:11

RUN addgroup -S node && adduser -S -G node node 

WORKDIR /usr/src/app

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229 9230

RUN mkdir -p /opt/node_app && chown -R node:node /opt/node_app
WORKDIR /opt/node_app

USER node
COPY --chown=node:node package.json package-lock.json* ./
RUN npx yarn 
# npm install --no-optional && npm cache clean --force
ENV PATH /opt/node_app/node_modules/.bin:$PATH

COPY --chown=node:node . .

CMD [ "npm", "start" ]