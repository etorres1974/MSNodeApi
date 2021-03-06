import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { AgendaClientDto } from "./dtos/agenda-cliente.dto";
import { AgendaDoctorDto } from "./dtos/agenda-doctor.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginDTO } from "./dtos/LoginDTO";
import { MarcarConsultaDto } from "./dtos/marcar-consulta.dto";
import { ConsultarAgendaDto } from "./dtos/consultar-agenda.dto"
import { DoctorsIdsDto } from "./dtos/doctors-ids.dto";

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

  @Get("/allDoctors")
  async getAllDoctors() {
    return await this.appService.getAllDoctors()
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
    return await this.appService.marcarConsulta(marcarConsultaDto)
  }

  @Post("/clientAgenda")
  async PostClientAgenda( @Body() dto : AgendaClientDto ){
    return await this.appService.getAgendaClient(dto)
  }

  @Post("/doctorAgenda")
  async getDoctorgenda( @Body() dto : AgendaDoctorDto ){
    return await this.appService.getAgendaDoctor(dto)
  }

  @Post("/consultarAgenda")
  async consultarAgenda(@Body() dto : ConsultarAgendaDto){
    return await this.appService.consultarAgenda(dto)
  }

  @Post("/doctorsByIds")
  async getDoctorsByIds(@Body() dto : DoctorsIdsDto){
    return await this.appService.doctorsById(dto)
  }

}