/* eslint-disable prettier/prettier */
import { User } from "src/users/user.entity";
import { EntityRepository, Repository } from "typeorm";
import {
    InternalServerErrorException,
} from "@nestjs/common";
import { Doctor } from './doctor.entity';
import { CreateDoctorDto } from "./dtos/create-doctor.dto";
@EntityRepository(Doctor)
export class DoctorRepository extends Repository<Doctor> {


  async createDoctor(createDoctorDto : CreateDoctorDto, user : User){
    const Doctor = this.create()
    Doctor.especialidade = createDoctorDto.especialidade
    Doctor.registro = createDoctorDto.registro
    Doctor.userId = user.id
    try{
        await Doctor.save()
        console.log(`Doctor created to user ${user.name}`)
        return Doctor
    }catch(error){
        throw new InternalServerErrorException(
            "Erro ao salvar o Doctor no banco de dados + \n" + error.code
          );
    }
    }
}
