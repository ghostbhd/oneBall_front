import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv'; 
async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: '*', 
    methods: 'GET,POST', 
   credentials: true,
  });
 const configs = new DocumentBuilder()
    .setTitle('api endpoints')
    .build();
  const document = SwaggerModule.createDocument(app, configs);
  
console.log("the config is not found", process.env)
  SwaggerModule.setup('/', app, document);
  await app.listen(3009);
}
bootstrap();
