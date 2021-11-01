import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs/operators";
import { AgendaClientDto } from "./dtos/agenda-cliente.dto";
import { AgendaDoctorDto } from "./dtos/agenda-doctor.dto";
import { ConsultarAgendaDto } from "./dtos/consultar-agenda.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { DoctorsIdsDto } from "./dtos/doctors-ids.dto";
import { LoginDTO } from "./dtos/LoginDTO";
import { MarcarConsultaDto } from "./dtos/marcar-consulta.dto";

@Injectable()
export class AppService {
  constructor(
    @Inject("SERVICE_A") private readonly clientServiceA: ClientProxy,
    @Inject("SERVICE_DATABASE") private readonly clientServiceDatabase: ClientProxy,
    @Inject("SERVICE_AGENDA") private readonly clientServiceAgenda: ClientProxy
  ) {}

  consultarAgenda(dto : ConsultarAgendaDto){
    const startTs = Date.now();
    const pattern = 'consultarAgenda';
    const payload = dto;
    return this.clientServiceAgenda
      .send<string>(pattern, payload)
      .pipe(
        map((data) => ({ data, duration: Date.now() - startTs }))
      );
  }

  marcarConsulta(dto : MarcarConsultaDto){
    const startTs = Date.now();
    const pattern = 'marcarConsulta';
    const payload = dto;
    return this.clientServiceAgenda
      .send<string>(pattern, payload)
      .pipe(
        map((especs) => ({ especs, duration: Date.now() - startTs }))
      );
  }

  
  async getAgendaClient(dto: AgendaClientDto){
    const startTs = Date.now();
    const pattern = 'agendaClient';
    const payload = dto;
    return this.clientServiceAgenda
      .send<string>(pattern, payload)
      .pipe(
        map((especs) => ({ especs, duration: Date.now() - startTs }))
      );
  }

  async getAgendaDoctor(dto : AgendaDoctorDto){
    const startTs = Date.now();
    const pattern = 'agendaDoctor';
    const payload = dto;
    return this.clientServiceAgenda
      .send<string>(pattern, payload)
      .pipe(
        map((especs) => ({ especs, duration: Date.now() - startTs }))
      );
  }

  getSpecs()  {
    const startTs = Date.now();
    const pattern = 'specs';
    const payload = {};
    return this.clientServiceA
      .send<string>(pattern, payload)
      .pipe(
        map((especs) => ({ especs, duration: Date.now() - startTs }))
      );
  }

  async doctorsById(dto : DoctorsIdsDto){
    const startTs = Date.now();
    const pattern = 'doctorsById';
    const payload = dto;
    return await this.clientServiceDatabase
      .send<string>(pattern, payload)
      .pipe(
        map((data) => ({ data, duration: Date.now() - startTs }))
      );
  }

  async getAllUsers() {
    const startTs = Date.now();
    const pattern = 'allUsers';
    const payload = {};
    return await this.clientServiceDatabase
      .send<string>(pattern, payload)
      .pipe(
        map((data) => ({ data, duration: Date.now() - startTs }))
      );
  }

  async getAllDoctors() {
    const startTs = Date.now();
    const pattern = 'allDoctors';
    const payload = {};
    return await this.clientServiceDatabase
      .send<string>(pattern, payload)
      .pipe(
        map((data) => ({ data, duration: Date.now() - startTs }))
      );
  }

  async login(loginDTO : LoginDTO){
    const startTs = Date.now();
    const pattern = 'login';
    const payload = loginDTO;
    return await this.clientServiceDatabase
      .send<string>(pattern, payload)
      .pipe(
        map((data: string) => ({ data , duration: Date.now() - startTs }))
      );
  }


  async signUp(createUserDto : CreateUserDto){
    const startTs = Date.now();
    const pattern = 'signUp';
    const payload = createUserDto;
    return await this.clientServiceDatabase
      .send<string>(pattern, payload)
      .pipe(
        map((data: string) => ({ data , duration: Date.now() - startTs }))
      );
  }
}