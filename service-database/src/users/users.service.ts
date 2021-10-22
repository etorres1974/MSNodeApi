/* eslint-disable prettier/prettier */
import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./user.entity";
import { LoginUserDto } from "./dtos/login-user.dto";
import { InternalServerErrorException } from "@nestjs/common";
import { UserRole } from "./user.roles.enum";
import { ClientRepository } from "src/client/client.repository";
import { CreateClientDto } from "src/client/dtos/create-client.dto";
import { DoctorRepository } from "src/doctor/doctor.repository";
import { CreateDoctorDto } from "src/doctor/dtos/create-doctor.dto";
import { ReturnUserDto } from "./dtos/return-user.dto";
@Injectable()
export class UsersService {
  publicUserSelect: Array<keyof User> = ["email", "name", "id"];
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(ClientRepository)
    private clientRepository: ClientRepository,

    @InjectRepository(DoctorRepository)
    private doctorRepository: DoctorRepository
  ) {}

  async createSpecialization(
    user: User,
    role: UserRole,
    createClientDto: CreateClientDto,
    createDoctorDto: CreateDoctorDto
  ) {
    if (role == UserRole.CLIENT)
      return this.clientRepository.createClient(createClientDto, user);
    else if (role == UserRole.DOCTOR)
      return this.doctorRepository.createDoctor(createDoctorDto, user);
    else
      throw new InternalServerErrorException(
        "Especialização do usuário não é válida + \n" + role
      );
  }

  async getSpecialization(userId: string, role: UserRole) {
    try {
      if (role == UserRole.CLIENT)
        return this.clientRepository.getClient(userId);
      else if (role == UserRole.DOCTOR)
        return this.doctorRepository.getDoctor(userId);
      else
        throw new InternalServerErrorException(
          "Especialização do usuário não é válida + \n" + role
        );
    } catch (e) {
      throw new InternalServerErrorException(
        "User ID não possui especializacao \n" + e
      );
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const {
      password,
      passwordConfirmation,
      role,
      createClientDto,
      createDoctorDto,
    } = createUserDto;
    if (password != passwordConfirmation) {
      throw new UnprocessableEntityException("As senhas não conferem");
    } else {
      const user = await this.userRepository.createUser(createUserDto);
      const spec = await this.createSpecialization(
        user,
        role,
        createClientDto,
        createDoctorDto
      );
      var message = user != null && spec != null ? "Success" : "Fail";
      return { user, spec, message };
    }
  }

  async loginUser(loginDTO: LoginUserDto): Promise<ReturnUserDto> {
    const user = await this.userRepository.checkCredentials(loginDTO);
    const spec = await this.getSpecialization(user.id, user.role)
    var message = user != null && spec != null ? "Success" : "Fail";
    return { user, spec, message };
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId, {
      select: this.publicUserSelect,
    });

    if (!user) throw new NotFoundException("Usuário não encontrado");

    return user;
  }

  async findAllUsers(): Promise<Array<User>> {
    const users = await this.userRepository.find({
      select: this.publicUserSelect,
    });

    return users;
  }
}
