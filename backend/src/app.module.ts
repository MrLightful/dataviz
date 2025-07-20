import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@app/db';
import { ConfigifyModule } from '@itgorillaz/configify';

@Module({
  imports: [ConfigifyModule.forRootAsync(), DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
