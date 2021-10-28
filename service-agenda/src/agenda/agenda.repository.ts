/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from "typeorm";
import {
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { Agenda} from "./agenda.entity"
import { MarcarConsultaDto } from "./dtos/marcar-consulta.dto"
@EntityRepository(Agenda)
export class AgendaRepository extends Repository<Agenda> {

  async createAgenda(createAgendaDto: MarcarConsultaDto): Promise<Agenda> {
    const { clientId, doctorId, min, max} = createAgendaDto;
    const agenda = this.create();
    agenda.clientId = clientId
    agenda.doctorId = doctorId
    agenda.min = min
    agenda.max = max

    try {
      await agenda.save();
      return agenda;
    } catch (error) {
      if (error.code.toString() === "1062" || error.code.toString() === 'ER_DUP_ENTRY') {
        throw new ConflictException("Conflito de Agenda");
      } else {
        throw new InternalServerErrorException(
          error.code + "Erro ao salvar Agenda no banco de dados + \n" + error
        );
      }
    }
  }

}
