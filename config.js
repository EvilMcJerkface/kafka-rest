"use strict";
const debug = require("debug");

const logger = {
  debug: debug("kafka-rest:debug"),
  info: debug("kafka-rest:info"),
  warn: debug("kafka-rest:warn"),
  error: debug("kafka-rest:error")
};

const config = {
  logger,
  consumer: {
    autoremove: 30000,
    noptions: {
      //"debug": "all",
      "metadata.broker.list": "kafka:9092",
      "group.id": "kafka-rest-group",
      "event_cb": true,
      "compression.codec": "none",
      "enable.auto.commit": false
    },
    tconf: {
    }
  },
  producer: {
    noptions: {
      //"debug": "all",
      "metadata.broker.list": "kafka:9092",
      "client.id": "kafka-rest-client",
      "event_cb": true,
      "compression.codec": "none",
    },
    tconf: {
    }
  },
  http:{
    port: 8082
  }
};

Object.keys(process.env).forEach((env)=>{
  if(env.startsWith("KAFKA_REST_CONSUMER_")){
    config.consumer.noptions[env.slice(20).toLowerCase().replace(/_/g, ".")] = process.env[env];
  } else if(env.startsWith("KAFKA_REST_PRODUCER_")){
    config.producer.noptions[env.slice(20).toLowerCase().replace(/_/g, ".")] = process.env[env];
  } else if(env.startsWith("KAFKA_REST_")){
    config.consumer.noptions[env.slice(11).toLowerCase().replace(/_/g, ".")] = process.env[env];
    config.producer.noptions[env.slice(11).toLowerCase().replace(/_/g, ".")] = process.env[env];
  }
});

module.exports= config;
