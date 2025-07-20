import { Injectable, Logger } from '@nestjs/common';
import { DatabaseConfig } from './db.config';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);
  readonly db: ReturnType<typeof drizzle>;
  constructor(databaseConfig: DatabaseConfig) {
    const client = createClient({ url: databaseConfig.fileName });
    this.db = drizzle(client);
    this.logger.log(`Database connection initialized`);
  }
}
