import { index, int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const taxonomyDb = sqliteTable(
  'taxonomy',
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    size: int().notNull(),
  },
  (t) => [index('idx_name').on(t.name)],
);
export type Taxonomy = typeof taxonomyDb.$inferInsert;
