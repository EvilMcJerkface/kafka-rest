FROM node

RUN mkdir -p /usr/src/app \
  && apt-get update && apt-get install -y build-essential python librdkafka-dev libsasl2-dev libsasl2-modules openssl \
  && apt-get autoremove -y && apt-get autoclean -y \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN yarn install

CMD ["yarn", "start"]
