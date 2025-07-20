import { DatabaseService } from '@app/db';
import { Injectable } from '@nestjs/common';
import { Taxonomy, taxonomyDb } from '../app.entity';
import { parseXml } from './formats/xml';

@Injectable()
export class IngestService {
  constructor(private readonly databaseService: DatabaseService) {}

  async ingestUrl(url: string) {
    const file = await fetch(url);
    const content = await file.text();
    const result = await parseXml(content);

    // Batch insert in chunks to reduce load on the database.
    const batchSize = 250;
    for (let i = 0; i < result.length; i += batchSize) {
      console.log(`Ingesting ${i} of ${result.length}`);
      await this.ingestRaw(result.slice(i, i + batchSize));
    }
    console.log(`Ingested ${result.length} items`);
  }

  async ingestRaw(items: Taxonomy[]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await this.databaseService.db.insert(taxonomyDb).values(items);
  }
}
