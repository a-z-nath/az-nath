CREATE TABLE `personal_info` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`email` text,
	`github_url` text,
	`linkedin_url` text,
	`avatar_url` text,
	`updated_at` text DEFAULT 'datetime(''now'')'
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`url` text NOT NULL,
	`language` text,
	`stars` integer DEFAULT 0,
	`topics` text,
	`homepage` text,
	`created_at` text DEFAULT 'datetime(''now'')',
	`updated_at` text DEFAULT 'datetime(''now'')',
	`github_updated_at` text,
	`is_featured` integer DEFAULT false,
	`display_order` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `skills` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`display_order` integer DEFAULT 0,
	`is_active` integer DEFAULT true
);
