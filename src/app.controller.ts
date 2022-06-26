import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAppInfo(): object {
    return {
      name: 'NodeJS Assignment',
      version: '1.0.0',
    };
  }
}
