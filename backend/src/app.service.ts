import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
<<<<<<< Updated upstream
  getHello(): string {
    return 'Hello World!';
=======
  constructor(private readonly databaseService: DatabaseService) {}
  getTree(path?: string): Promise<Taxonomy[]> {
    return this.databaseService.db
      .select()
      .from(taxonomyDb)
      .where(
        path
          ?
            and(
              like(taxonomyDb.name, `${path} > %`),
              notLike(taxonomyDb.name, `${path} > % > %`),
            )
          : notLike(taxonomyDb.name, '% > %'),
      );
>>>>>>> Stashed changes
  }
}
