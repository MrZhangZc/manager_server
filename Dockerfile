FROM keymetrics/pm2:10-alpine

ARG NODE_ENV=production
ARG PORT=5002

ENV NODE_ENV $NODE_ENV
ENV PORT $PORT

EXPOSE $PORT

WORKDIR /app

COPY package.json yarn.lock nest-cli.json tsconfig.build.json tsconfig.json /app/
COPY src/ /app/src

RUN yarn install \
    && yarn cache clean \
    && yarn build

COPY up.yml /app/

CMD ["pm2-runtime", "start", "up.yml"]
