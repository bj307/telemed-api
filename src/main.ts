import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
  .setTitle('TELEMEDICINA')
  .setDescription('API TELEMEDICINA')
  .setVersion('1.0')
  .addTag('telemed')
  .build();

  const app = await NestFactory.create(AppModule, { cors: true });
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3000; 

  await app.listen(port);
}
bootstrap();
