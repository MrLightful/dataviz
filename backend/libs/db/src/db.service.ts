import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from './db.config';
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';

export type Database = LibSQLDatabase;

@Injectable()
export class DatabaseService {
  readonly db: Database;
  constructor(databaseConfig: DatabaseConfig) {
    this.db = drizzle(databaseConfig.fileName);
  }
}
