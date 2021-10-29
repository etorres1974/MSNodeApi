import { UserRole } from "../user.roles.enum";
import { CreateClientDto } from "src/client/dtos/create-client.dto";
import { CreateDoctorDto } from "src/doctor/dtos/create-doctor.dto";
export class CreateUserDto {
    email: string;
    name: string;
    password: string;
    passwordConfirmation: string;
    role : UserRole;
    createClientDto : CreateClientDto;
    createDoctorDto : CreateDoctorDto
  }