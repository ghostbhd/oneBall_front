import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors({ origin: 'http://localhost:3000' }); // Enable CORS for the frontend
  await app.listen(3009);
}
bootstrap();