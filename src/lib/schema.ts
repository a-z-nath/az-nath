import { sqliteTable, integer, text, blob } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey(), // GitHub repo ID
  name: text('name').notNull(),
  description: text('description'),
  url: text('url').notNull(),
  language: text('language'),
  stars: integer('stars').default(0),
  topics: text('topics', { mode: 'json' }).$type<string[]>(),
  homepage: text('homepage'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
  githubUpdatedAt: text('github_updated_at'),
  isFeatured: integer('is_featured', { mode: 'boolean' }).default(false),
  displayOrder: integer('display_order').default(0),
});