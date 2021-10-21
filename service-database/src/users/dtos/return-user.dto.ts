/* eslint-disable prettier/prettier */
import { User } from '../user.entity';

export class ReturnUserDto {
  user: User;
  spec : any;
  message: string;
}