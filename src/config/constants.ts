export const App = {
  Port: 3000,
  ServiceName: 'rabbitmq-publisher'
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
