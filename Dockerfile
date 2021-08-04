FROM keymetrics/pm2:14-jessie

ARG PORT=5002

ENV PORT $PORT

EXPOSE $PORT

WORKDIR /app

COPY package.json yarn.lock nest-cli.json tsconfig.build.json tsconfig.json /app/
COPY src/ /app/src

RUN yarn install \
    && yarn cache clean \
    && yarn build

COPY up.yml /app/

CMD [ "yarn", "run", "pm2-docker-prod" ]