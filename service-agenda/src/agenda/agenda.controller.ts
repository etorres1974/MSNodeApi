import { Controller,
    Post,
    Body,
    Get,
    Param,} from '@nestjs/common';
  import { AgendaService } from './agenda.service';
  import { Agenda } from "./agenda.entity"
  import { MessagePattern } from '@nestjs/microservices';
  import { MarcarConsultaDto } from './dtos/marcar-consulta.dto';
  import { AgendaClientDto } from "./dtos/agenda-cliente.dto"
  import { AgendaDoctorDto} from "./dtos/agenda-doctor.dto"

  @Controller('agenda')
  export class AgendaController {
    constructor(private agendaService:AgendaService) {}
  
    @MessagePattern('marcarConsulta')
    async marcarConsulta(
      @Body() MarcarConsultaDto: MarcarConsultaDto
    ): Promise<Agenda> {
      const agenda = await this.agendaService.marcarConsulta(MarcarConsultaDto);
      return agenda
    }
  
    @MessagePattern('agendaClient')
    async agendaCliente(
        @Body() dto: AgendaClientDto
    ){
      const agenda = await this.agendaService.findAgendaByClientId(dto.clientId)
      var message = agenda ? "Success" : "Fail"
      return {
        total : agenda.length,
        agenda,
        message,
      };
    }

    @MessagePattern('agendaDoctor')
    async agendaDoctor(
        @Body() dto: AgendaDoctorDto
    ){
      const agenda = await this.agendaService.findAgendaByDoctorId(dto.doctorId)
      var message = agenda ? "Success" : "Fail"
      return {
        total : agenda.length,
        agenda,
        message,
      };
    }
  
  }
  