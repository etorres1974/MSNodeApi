/* eslint-disable prettier/prettier */
import {
    Injectable
  } from "@nestjs/common";
  import { InjectRepository } from "@nestjs/typeorm";
  import { AgendaRepository } from "../agenda/agenda.repository"
import { MarcarConsultaDto } from "./dtos/marcar-consulta.dto";
import { Agenda } from "./agenda.entity"
  @Injectable()
  export class AgendaService {
    constructor(

      @InjectRepository(AgendaRepository)
      private agendaRepository: AgendaRepository
    ) {}

    async marcarConsulta(marcarConsultaDto: MarcarConsultaDto): Promise<Agenda> {
          const agenda = await this.agendaRepository.createAgenda(marcarConsultaDto);
          var message = agenda != null ? "Success" : "Fail";
          return agenda;
        
      }

      
    async findAgendaByClientId(clientId: string): Promise<Array<Agenda>> {
        const agendas = await this.agendaRepository.find({
            where: {
                clientId : clientId
            }
        });
        return agendas;
    }

    async findAgendaByDoctorId(doctorId: string): Promise<Array<Agenda>> {
        const agendas = await this.agendaRepository.find({
            where: {
                doctorId : doctorId
            }
        });
        return agendas;
    }
  }
  