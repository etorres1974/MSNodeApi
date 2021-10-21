/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientRepository } from 'src/client/client.repository';
import { DoctorRepository } from 'src/doctor/doctor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, ClientRepository, DoctorRepository])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}