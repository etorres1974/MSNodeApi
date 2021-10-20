/* eslint-disable prettier/prettier */
import { User } from "src/users/user.entity";
import { EntityRepository, Repository } from "typeorm";
import {
    InternalServerErrorException,
} from "@nestjs/common";
import { Client } from './client.entity';
import { CreateClientDto } from "./dtos/create-client.dto";
@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {


  async createClient(createClientDto : CreateClientDto, user : User){
    const client = this.create()
    client.birth = createClientDto.birth
    client.height = createClientDto.height
    client.weight = createClientDto.weight
    client.userId = user.id
    try{
        await client.save()
        console.log(`Client created to user ${user.name}`)
    }catch(error){
        throw new InternalServerErrorException(
            "Erro ao salvar o Client no banco de dados + \n" + error.code
          );
    }
    }


}
