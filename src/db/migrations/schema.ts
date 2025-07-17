import {
  sqliteTable,
  AnySQLiteColumn,
  foreignKey,
  integer,
  text,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const features = sqliteTable("features", {
  id: integer().primaryKey({ autoIncrement: true }),
  recipe: integer()
    .notNull()
    .references(() => recipes.id, { onDelete: "cascade" }),
  featuredAt: integer().notNull(),
});

export const recipes = sqliteTable("recipes", {
  id: integer().primaryKey({ autoIncrement: true }),
  uuid: text().notNull(),
  embedUrl: text("embed_url").notNull(),
  author: text().notNull(),
  website: text().default(""),
  title: text().notNull(),
  intro: text().notNull(),
  ingredients: text().notNull(),
  instructions: text().notNull(),
  hidden: integer().default(0).notNull(),
  createdAt: integer()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer(),
  imageUrl: text("image_url").default("").notNull(),
  imageKey: text("image_key").default("").notNull(),
});
