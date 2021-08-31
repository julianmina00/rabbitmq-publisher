import { DocumentBuilder } from '@nestjs/swagger';
import { description, version } from '../../package.json';

const title = 'This project aims to test RabbitMQ by sendind messages';

const config = new DocumentBuilder()
  .setTitle(title)
  .setDescription(description)
  .setVersion(version)
  .addTag('App')
  .build();

export const swaggerConfig = () => config;
