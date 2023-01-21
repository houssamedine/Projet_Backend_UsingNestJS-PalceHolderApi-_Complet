import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Heal-Tcheck')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @HttpCode(200)
  healtcheck(): string {
    return this.appService.healtcheck();
  }
}
