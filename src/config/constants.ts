export const App = {
  Port: 3030,
  ServiceName: 'rabbitmq-publisher'
};

export const RabbitMQ = {
  ConnectionUrl: 'amqp://localhost:5672',
  QueueName: 'test-queue'
};

export enum Environments {
  LOCAL = 'local',
  DEV = 'development',
  PROD = 'production'
}

export enum LogLevels {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  VERBOSE = 'verbose'
}
