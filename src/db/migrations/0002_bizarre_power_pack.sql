ALTER TABLE `recipes` RENAME COLUMN "text" TO "details";--> statement-breakpoint
ALTER TABLE `recipes` ADD `intro` text DEFAULT '' NOT NULL;