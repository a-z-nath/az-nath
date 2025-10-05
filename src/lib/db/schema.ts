import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey(), // GitHub repo ID
  name: text('name').notNull(),
  description: text('description'),
  url: text('url').notNull(),
  language: text('language'),
  stars: integer('stars').default(0),
  topics: text('topics'), // JSON string of topics array
  homepage: text('homepage'),
  createdAt: text('created_at').default('datetime(\'now\')'),
  updatedAt: text('updated_at').default('datetime(\'now\')'),
  githubUpdatedAt: text('github_updated_at'),
  isFeatured: integer('is_featured', { mode: 'boolean' }).default(false),
  displayOrder: integer('display_order').default(0),
});

export const skills = sqliteTable('skills', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(), // 'language', 'framework', 'tool'
  displayOrder: integer('display_order').default(0),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
});

export const personalInfo = sqliteTable('personal_info', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  email: text('email'),
  githubUrl: text('github_url'),
  linkedinUrl: text('linkedin_url'),
  avatarUrl: text('avatar_url'),
  updatedAt: text('updated_at').default('datetime(\'now\')'),
});

// export projects data type as interface
export interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number | null;
  topics: string[];
  created_at: string | null;
  updated_at: string | null;
  featured: boolean | null;
  display_order: number | null;
}