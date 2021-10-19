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

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @MessagePattern('signUp')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createUser(createUserDto);
    var message = user ? "Success" : "Fail"
    return {
      user,
      message
    };
  }

  @MessagePattern('login')
  async login(@Body() loginDTO : LoginUserDto){
    const user = await this.usersService.loginUser(loginDTO)
    var message = user ? "Success" : "Fail"
    return {
      user,
      message
    }
  }

  @Get(':id')
  async findUserById(@Param('id') id): Promise<ReturnUserDto> {
    const user = await this.usersService.findUserById(id);
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

}
