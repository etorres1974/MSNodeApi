import { Controller,
  Post,
  Body,
  Get,
  Param,} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UsersService } from './users.service';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UserRole } from './user-roles.enum';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createAdminUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }

  @Get(':id')
  async findUserById(@Param('id') id): Promise<ReturnUserDto> {
    const user = await this.usersService.findUserById(id);
    return {
      user,
      message: 'Usuário encontrado',
    };
  }

  @MessagePattern('allUsers')
  async getAllusers(){
    const users = await this.usersService.findAllUsers()
    return {
      users,
      message: `${users.length} usuários encontrados`,
    };
  }

  @MessagePattern('login')
  async login(@Body() loginDTO : LoginUserDto){
    const user = await this.usersService.loginUser(loginDTO)
    return {
      user,
      message : `Success ${loginDTO.email} ${loginDTO.password}`
    }
  }

}
