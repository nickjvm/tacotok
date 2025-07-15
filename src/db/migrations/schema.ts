import { sqliteTable, AnySQLiteColumn, integer, text, foreignKey } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const embeds = sqliteTable("embeds", {
	id: integer().primaryKey(),
	url: text().notNull(),
	author: text().notNull(),
	createdAt: text().default("sql`(CURRENT_TIMESTAMP)`").notNull(),
});

export const recipes = sqliteTable("recipes", {
	id: integer().primaryKey(),
	details: text().notNull(),
	source: text(),
	post: text().notNull().references(() => embeds.id),
	intro: text().notNull(),
	title: text().notNull(),
	createdAt: text().default("sql`(CURRENT_TIMESTAMP)`").notNull(),
});

export const features = sqliteTable("features", {
	id: integer().primaryKey(),
	embed: integer().notNull().references(() => embeds.id, { onDelete: "cascade" } ),
	featuredAt: integer().notNull(),
});

