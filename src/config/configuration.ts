import { LogLevels, App, RabbitMQ } from './constants';

export default () => {
  return {
    serviceName: process.env.SERVICE_NAME || App.ServiceName,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : App.Port,
    loggerLevel: process.env.LOGGER_LEVEL || LogLevels.INFO,
    rabbitConnectionUrl:
      process.env.RABBIT_MQ_CONNECTION_URL || RabbitMQ.ConnectionUrl,
    rabbitQueueName: process.env.RABBIT_MQ_QUEUE || RabbitMQ.QueueName
  };
};
