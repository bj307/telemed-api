import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();

  const serviceAccount = JSON.parse(process.env.FIRE_CONNECT);
  
  if (!serviceAccount) {
    throw new Error('FIRE_CONNECT is not defined');
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  
  
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();
