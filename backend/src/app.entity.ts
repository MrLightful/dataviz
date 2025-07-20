import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const taxonomyDb = sqliteTable('taxonomy', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  size: int().notNull(),
});
export type Taxonomy = typeof taxonomyDb.$inferInsert;
