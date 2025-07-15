PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_embeds` (
	`id` integer PRIMARY KEY NOT NULL,
	`url` text,
	`author` text
);
--> statement-breakpoint
INSERT INTO `__new_embeds`("id", "url", "author") SELECT "id", "url", "author" FROM `embeds`;--> statement-breakpoint
DROP TABLE `embeds`;--> statement-breakpoint
ALTER TABLE `__new_embeds` RENAME TO `embeds`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_recipes` (
	`id` integer PRIMARY KEY NOT NULL,
	`text` text NOT NULL,
	`source` text,
	`post` text NOT NULL,
	`title` text DEFAULT '' NOT NULL,
	FOREIGN KEY (`post`) REFERENCES `embeds`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_recipes`("id", "text", "source", "post", "title") SELECT "id", "text", "source", "post", "title" FROM `recipes`;--> statement-breakpoint
DROP TABLE `recipes`;--> statement-breakpoint
ALTER TABLE `__new_recipes` RENAME TO `recipes`;