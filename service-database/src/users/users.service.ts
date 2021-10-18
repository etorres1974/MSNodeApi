/* eslint-disable prettier/prettier */
import { Injectable, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { UserRole } from './user-roles.enum';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class UsersService {
  publicUserSelect : Array<keyof User> = ['email', 'name', 'role', 'id']
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.userRepository.createUser(createUserDto, UserRole.ADMIN);
    }
  }
  async findUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId, {
      select: ['email', 'name', 'role', 'id'],
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

  async loginUser(loginDTO : LoginUserDto) : Promise<Array<User>>{
    //todo usar dto para pegar usuario ou falhar
    const user = await this.userRepository.find(
      { select: this.publicUserSelect }
    )
    return user
  }
}