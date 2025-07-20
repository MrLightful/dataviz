import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('tree')
  getTree(@Query('path') path?: string) {
    return this.appService.getTree(path);
  }
}
