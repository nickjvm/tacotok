-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `embeds` (
	`id` integer PRIMARY KEY,
	`url` text,
	`author` text
);
--> statement-breakpoint
CREATE TABLE `recipes` (
	`id` integer PRIMARY KEY,
	`text` text NOT NULL,
	`source` text,
	`post` text NOT NULL,
	`title` text DEFAULT '' NOT NULL,
	FOREIGN KEY (`post`) REFERENCES `embeds`(`id`) ON UPDATE no action ON DELETE no action
);

*/