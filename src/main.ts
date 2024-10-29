import {NestApplication, NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api"); // Set the global prefix for all routes
  app.useGlobalPipes(new ValidationPipe()); // Automatically validate incoming requests
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
