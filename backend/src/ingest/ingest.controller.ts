import { Body, Controller, Post } from '@nestjs/common';
import { IngestService } from './ingest.service';

@Controller('ingest')
export class IngestController {
  constructor(private readonly ingestService: IngestService) {}

  @Post('url')
  ingest(@Body() body: { url: string }) {
    this.ingestService.ingestUrl(body.url).catch((e) => {
      console.error(e);
    });
  }
}
