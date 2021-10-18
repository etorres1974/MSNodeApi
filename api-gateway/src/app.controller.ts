import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { LoginDTO } from "./dtos/LoginDTO";

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

  @Post("/login")
  async login(@Body() loginDTO : LoginDTO) {
    return await this.appService.login(loginDTO)
  }
}