import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('path')
  getPath(@Query('query') query?: string) {
    return this.appService.getPath(query);
  }
}
