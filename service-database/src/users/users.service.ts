/* eslint-disable prettier/prettier */
import { Injectable, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { LoginUserDto } from './dtos/login-user.dto';
import {
  InternalServerErrorException,
} from "@nestjs/common";
import { UserRole } from "./user.roles.enum";
import { ClientRepository } from 'src/client/client.repository';
import { CreateClientDto } from 'src/client/dtos/create-client.dto';
@Injectable()
export class UsersService {
  publicUserSelect : Array<keyof User> = ['email', 'name', 'id']
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(ClientRepository)
    private clientRepository : ClientRepository
  ) {}

  async createSpecialization(user : User, role : UserRole, createClientDto : CreateClientDto){
    if(role == UserRole.CLIENT)
      return this.clientRepository.createClient(createClientDto, user)
    else if ( role == UserRole.DOCTOR)
      return new InternalServerErrorException("createDoc") //this.createDoctor()
    else 
      throw new InternalServerErrorException(
        "Especialização do usuário não é válida + \n" + role
      )
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password , passwordConfirmation, role, createClientDto } = createUserDto
    if (password != passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      const user = await this.userRepository.createUser(createUserDto);
      await this.createSpecialization(user, role, createClientDto)
      return user
    }
  }

  async loginUser(loginDTO : LoginUserDto) : Promise<User>{
    const user = await this.userRepository.checkCredentials(loginDTO)
    return user
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId, {
      select: this.publicUserSelect,
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user;
  }

  async findAllUsers(): Promise<Array<User>> {
    const users = await this.userRepository.find({
      select: this.publicUserSelect
    });
    
    return users;
  }



}