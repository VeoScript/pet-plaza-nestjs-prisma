// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // app.enableCors({
  //   origin: ['*', 'https://localhost:3000'],
  //   methods: ['POST', 'PUT', 'DELETE', 'GET']
  // });

  const config = new DocumentBuilder()
    .setTitle('NestJS Prisma Practice')
    .setDescription('The NestJS Prisma Practice API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();
