import { UserRole } from "../user.roles.enum";
import { CreateClientDto } from "src/client/dtos/create-client.dto";
export class CreateUserDto {
    email: string;
    name: string;
    password: string;
    passwordConfirmation: string;
    role : UserRole;
    createClientDto : CreateClientDto
  }