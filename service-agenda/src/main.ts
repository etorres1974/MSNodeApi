import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
      transport : Transport.TCP,
      options : {
        host: "service-agenda",
        port : process.env.SERVICE_AGENDA_PORT
      }
  });
   app.listen()
}
bootstrap();
