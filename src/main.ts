import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // This enables CORS for all origins
  // app.enableCors({
  //   origin: "http://localhost:5173",
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: 'Content-Type,Authorization,cookie',
  // });
  await app.listen(3009);
}
bootstrap();

