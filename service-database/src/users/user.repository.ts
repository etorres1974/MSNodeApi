/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dtos/create-user.dto";
import {
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { LoginUserDto } from "./dtos/login-user.dto";
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, name, password } = createUserDto;
    const user = this.create();
    user.email = email;
    user.name = name;
    user.status = true;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
      if (error.code.toString() === "1062" || error.code.toString() === 'ER_DUP_ENTRY') {
        throw new ConflictException("Endereço de email já está em uso");
      } else {
        throw new InternalServerErrorException(
          "Erro ao salvar o usuário no banco de dados + \n" + error.code
        );
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async checkCredentials(credentialsDto: LoginUserDto): Promise<User> {
    const { email, password } = credentialsDto;
    const user = await this.findOne({ email, status: true });

    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}
