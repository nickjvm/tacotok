import {
  sqliteTable,
  AnySQLiteColumn,
  integer,
  text,
  foreignKey,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const recipes_new = sqliteTable("recipes_new", {
  id: integer().primaryKey({ autoIncrement: true }),
  uuid: text().notNull().unique(),
  embedUrl: text("embed_url").notNull(),
  author: text().notNull(),
  website: text().default(""),
  title: text().notNull(),
  intro: text().notNull(),
  ingredients: text().notNull(),
  instructions: text().notNull(),
  imageUrl: text("image_url").default(""),
  hidden: integer({ mode: "boolean" }).notNull().default(false),
  createdAt: integer()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer(),
});

export const features_new = sqliteTable("features_new", {
  id: integer().primaryKey({ autoIncrement: true }),
  recipe: integer()
    .notNull()
    .references(() => recipes_new.id, { onDelete: "cascade" }),
  featuredAt: integer()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
