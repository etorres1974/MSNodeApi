import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { AgendaModule } from './agenda/agenda.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AgendaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}