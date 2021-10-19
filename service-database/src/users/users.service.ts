/* eslint-disable prettier/prettier */
import { Injectable, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class UsersService {
  publicUserSelect : Array<keyof User> = ['email', 'name', 'id']
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.userRepository.createUser(createUserDto);
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