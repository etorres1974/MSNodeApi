import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppService } from "./app.service";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "SERVICE_A",
        transport: 0,//Transport.TCP
        options: {
          host: "service-a",
          port: process.env.SERVICE_A_PORT
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}