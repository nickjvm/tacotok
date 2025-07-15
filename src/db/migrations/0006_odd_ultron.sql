CREATE TABLE `features_new` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`recipe` integer NOT NULL,
	`featuredAt` text NOT NULL,
	FOREIGN KEY (`recipe`) REFERENCES `recipes_new`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `recipes_new` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`embed_url` text NOT NULL,
	`author` text NOT NULL,
	`website` text DEFAULT '',
	`title` text NOT NULL,
	`intro` text NOT NULL,
	`ingredients` text NOT NULL,
	`instructions` text NOT NULL,
	`hidden` integer DEFAULT false NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `recipes_new_uuid_unique` ON `recipes_new` (`uuid`);--> statement-breakpoint
DROP INDEX "recipes_new_uuid_unique";--> statement-breakpoint
ALTER TABLE `embeds` ALTER COLUMN "createdAt" TO "createdAt" text NOT NULL DEFAULT 'sql`(CURRENT_TIMESTAMP)`';--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_features` (
	`id` integer PRIMARY KEY NOT NULL,
	`embed` integer NOT NULL,
	`featuredAt` integer NOT NULL,
	FOREIGN KEY (`embed`) REFERENCES `embeds`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_features`("id", "embed", "featuredAt") SELECT "id", "embed", "featuredAt" FROM `features`;--> statement-breakpoint
DROP TABLE `features`;--> statement-breakpoint
ALTER TABLE `__new_features` RENAME TO `features`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `recipes` ALTER COLUMN "createdAt" TO "createdAt" text NOT NULL DEFAULT 'sql`(CURRENT_TIMESTAMP)`';