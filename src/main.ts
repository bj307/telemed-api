import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();

  const fireConnect = process.env.FIRE_CONNECT;

  if (!fireConnect) {
    throw new Error('FIRE_CONNECT is not defined');
  }

  let serviceAccount;
  try {
    serviceAccount = JSON.parse(fireConnect);
  } catch (error) {
    throw new Error('Failed to parse FIRE_CONNECT');
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
