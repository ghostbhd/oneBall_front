import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3009);
}
bootstrap();

// hey ayoub labas, wa5a tfakarni chahowa lurl liknti ka addi bih users ldatabase brit ntesti chil3ibat fchannels