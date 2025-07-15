CREATE TABLE `features` (
	`id` integer PRIMARY KEY NOT NULL,
	`embed` text NOT NULL,
	`featuredAt` integer NOT NULL,
	FOREIGN KEY (`embed`) REFERENCES `embeds`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `recipes` ALTER COLUMN "intro" TO "intro" text NOT NULL;--> statement-breakpoint
ALTER TABLE `recipes` ALTER COLUMN "title" TO "title" text NOT NULL;