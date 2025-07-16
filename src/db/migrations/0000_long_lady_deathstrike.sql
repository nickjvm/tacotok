-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `features` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`recipe` integer NOT NULL,
	`featuredAt` integer NOT NULL,
	FOREIGN KEY (`recipe`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `recipes` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`uuid` text NOT NULL,
	`embed_url` text NOT NULL,
	`author` text NOT NULL,
	`website` text DEFAULT '',
	`title` text NOT NULL,
	`intro` text NOT NULL,
	`ingredients` text NOT NULL,
	`instructions` text NOT NULL,
	`hidden` integer DEFAULT false NOT NULL,
	`createdAt` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` integer,
	`image_url` text DEFAULT '' NOT NULL
);

*/