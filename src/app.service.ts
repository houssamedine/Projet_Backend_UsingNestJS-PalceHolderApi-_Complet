import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healtcheck(): string {
    return 'UP';
  }
}
