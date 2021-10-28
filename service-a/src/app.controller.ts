import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Controller()
export class AppController {
  @MessagePattern('specs')
  ping(_: any) {
    const especializacoes = [ "Pediatra", "Ortopedista", "Oftamologista", "Neurologista", "Dentista", "Dermatologista"]
    return of(especializacoes).pipe(delay(1));
  }
}
