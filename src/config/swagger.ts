import { DocumentBuilder } from '@nestjs/swagger';
import { description, version } from '../../package.json';

const title = 'This project aims to test RabbitMQ by sendind messages [D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[D[g[4~[C[C[C[C[C[C[C[C[C[C[C[';

const config = new DocumentBuilder()
  .setTitle(title)
  .setDescription(description)
  .setVersion(version)
  .addTag('App')
  .build();

export const swaggerConfig = () => config;
