import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global pipe to validate the request object, dto, etc
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips away unwanted properties from the request object
    }),
  );
  await app.listen(3000);
}
bootstrap();
