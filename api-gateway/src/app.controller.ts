import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginDTO } from "./dtos/LoginDTO";
import { MarcarConsultaDto } from "./dtos/marcar-consulta.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private logger = new Logger('AppController')

  @Get("/specs")
  getSpecs() {
    return this.appService.getSpecs();
  }

  @Get("/allUsers")
  async getAllUsers() {
    return await this.appService.getAllUsers()
  }

  @Post("/login")
  async login(@Body() loginDTO : LoginDTO) {
    return await this.appService.login(loginDTO)
  }

  @Post("/signUp")
  async signUp(@Body() createUserDto : CreateUserDto) {
    return await this.appService.signUp(createUserDto)
  }

  @Post("/marcarConsulta")
  async marcarConsulta(@Body() marcarConsultaDto : MarcarConsultaDto){
    return marcarConsultaDto
  }
}