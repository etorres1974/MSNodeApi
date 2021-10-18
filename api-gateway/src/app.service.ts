import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs/operators";
import { LoginDTO } from "./dtos/LoginDTO";

@Injectable()
export class AppService {
  constructor(
    @Inject("SERVICE_A") private readonly clientServiceA: ClientProxy,
    @Inject("SERVICE_DATABASE") private readonly clientServiceDatabase: ClientProxy
  ) {}

  pingServiceA()  {
    const startTs = Date.now();
    const pattern = 'ping';
    const payload = {};
    return this.clientServiceA
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs }))
      );
  }

  async getAllUsers() {
    const startTs = Date.now();
    const pattern = 'allUsers';
    const payload = {};
    return await this.clientServiceDatabase
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs }))
      );
  }

  async login(loginDTO : LoginDTO){
    const startTs = Date.now();
    const pattern = 'login';
    const payload = loginDTO;
    return await this.clientServiceDatabase
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs }))
      );
  }
}