import { DatabaseService } from '@app/db';
import { Injectable } from '@nestjs/common';
import { Taxonomy, taxonomyDb } from './app.entity';
import { and, like, notLike } from 'drizzle-orm';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}
  getPath(path?: string): Promise<Taxonomy[]> {
    return this.databaseService.db
      .select()
      .from(taxonomyDb)
      .where(
        path
          ? and(
              like(taxonomyDb.name, `${path} > %`),
              notLike(taxonomyDb.name, `${path} > % > %`),
            )
          : notLike(taxonomyDb.name, '% > %'),
      );
  }
}
