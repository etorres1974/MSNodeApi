/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendaRepository } from './agenda.repository';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AgendaRepository])],
  providers: [AgendaService],
  controllers: [AgendaController],
})
export class AgendaModule {}