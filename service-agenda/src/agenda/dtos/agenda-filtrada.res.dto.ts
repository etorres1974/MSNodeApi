import { Agenda } from "../agenda.entity";
export class AgendaFiltradaDto {
    todas : Array<Date>;
    livres : Array<Date>;
    ocupadas : Array<Agenda>
  }