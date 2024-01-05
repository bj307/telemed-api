import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { InternalServerErrorException, ServiceUnavailableException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';

//congiguracão para websocket para testar se pega no vercel
class MyIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    options = {
      ...options,
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
      }
    };
    return super.createIOServer(port, options);
  }
} 

async function bootstrap() {
  
  dotenv.config();  
     
  //conexao com o firebase
  const fireConnect = process.env.FIRE_CONNECT;

  if (!fireConnect) {
    throw new ServiceUnavailableException('FIRE_CONNECT is not defined');
  }

  let serviceAccount;
  try {
    serviceAccount = JSON.parse(fireConnect);
  } catch (error) {
    throw new ServiceUnavailableException('Failed to parse FIRE_CONNECT');
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });


  ///finaliza firebase

  //swagger

  const config = new DocumentBuilder()
  .setTitle('TELEMEDICINA')
  .setDescription('API TELEMEDICINA')
  .setVersion('1.0')
  .addTag('telemed')
  .build();
  

  const app = await NestFactory.create(AppModule, { cors: true });
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  //finaliza swagger

  //validação de dados
  app.useGlobalPipes(new ValidationPipe());

  //porta
  const port = process.env.PORT || 3000; 

  //inicia a aplicação
  await app.listen(port);

  //websocket
  app.useWebSocketAdapter(new MyIoAdapter(app));

}
bootstrap();
