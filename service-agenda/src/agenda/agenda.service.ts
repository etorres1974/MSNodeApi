/* eslint-disable prettier/prettier */
import {
    Injectable
  } from "@nestjs/common";
  import { InjectRepository } from "@nestjs/typeorm";
  import { AgendaRepository } from "../agenda/agenda.repository"
import { MarcarConsultaDto } from "./dtos/marcar-consulta.dto";
import { Agenda } from "./agenda.entity"
import { ConsultarAgendaDto } from "./dtos/consultar-agenda.dto";
import { min } from "node_modules/rxjs/dist/types";
import { AgendaFiltradaDto } from "./dtos/agenda-filtrada.res.dto";
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

    async findAgendaByDateSpec(dto: ConsultarAgendaDto): Promise<AgendaFiltradaDto> {
      const agendas = await this.agendaRepository.find({
          where: {spec : dto.spec }
      });
      const ocupadas = agendas.filter( (row) => {
        return row.min >= new Date(dto.min) && 
                row.max <= new Date(dto.max)
      })
      var todas = this.agendaTotal(dto.min, dto.max)
      const livres = todas.filter( (it) => {
        return !ocupadas.map( (r)=> r.min ).includes(it)
      })
      return {todas, ocupadas, livres}
    }

    agendaTotal(min, max) : Array<Date>{
      var lista : Array<Date> = []
      const day = 86400000
      var minTime = new Date(min).getTime()
      var maxTime = new Date(max).getTime()
      for(var d = minTime ; d < maxTime; d += day){
        for(var h = 6; h < 18 ; h++){
          var m = new Date(d) 
              m.setHours(h)
              lista.push(m)
        }
      }  
      return lista
    }
    

  }
  