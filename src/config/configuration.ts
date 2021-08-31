import { LogLevels, App } from './constants';

export default () => ({
  serviceName: process.env.SERVICE_NAME || App.ServiceName,
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : App.Port,
  loggerLevel: process.env.LOGGER_LEVEL || LogLevels.INFO
});
