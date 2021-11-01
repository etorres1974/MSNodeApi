import { Controller,
  Post,
  Body,
  Get,
  Param,} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UsersService } from './users.service';
import { ReturnUserDto } from './dtos/return-user.dto';
import { MessagePattern } from '@nestjs/microservices';
import { DoctorsIdsDto } from "../doctor/dtos/doctorsIds.dto"
import { UserRole } from './user.roles.enum';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @MessagePattern('signUp')
  async createUser(
    @Body() createUserDto: CreateUserDto 
  ): Promise<ReturnUserDto> {
    const UserResponse = await this.usersService.createUser(createUserDto);
    return UserResponse
  }

  @MessagePattern('login')
  async login(@Body() loginDTO : LoginUserDto) : Promise<ReturnUserDto> {
    const UserResponse = await this.usersService.loginUser(loginDTO)
    return UserResponse
  }

  @Get(':id')
  async findUserById(@Param('id') id) {
    const user = await this.usersService.findUserById(id);
    //TODO - Adicionar Spec
    var message = user ? "Success" : "Fail"
    return {
      user,
      message
    };
  }

  @MessagePattern('allUsers')
  async getAllusers(){
    const users = await this.usersService.findAllUsers()
    var message = users ? "Success" : "Fail"
    return {
      total : users.length,
      users,
      message,
    };
  }
  //Doutors que nao estao na lista, pois a lista sao de agendamentos no periodo
  @MessagePattern('doctorsById')
  async doctorsById(@Body() dto : DoctorsIdsDto){
    const users = await this.usersService.findAllUsers()
    const doctors = users.filter( (it) => !dto.doctorsIds.includes(it.id))
    var message = users ? "Success" : "Fail"
    return {
      total : users.length,
      doctors,
      message,
    };
  }

  @MessagePattern('allDoctors')
  async doctors(){
    const users = await this.usersService.findAllUsers()
    const doctors = users.filter( (it) => it.role == UserRole.DOCTOR)
    var message = users ? "Success" : "Fail"
    return {
      total : doctors.length,
      doctors,
      message,
    };
  }
}
