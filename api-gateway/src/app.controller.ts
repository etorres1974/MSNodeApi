import { Controller, Get, Logger } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private logger = new Logger('AppController')

  @Get("/ping-a")
  pingServiceA() {
    return this.appService.pingServiceA();
  }

  @Get("/allUsers")
  async getAllUsers() {
    return await this.appService.getAllUsers()
  }
}