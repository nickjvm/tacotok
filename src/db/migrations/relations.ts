import { relations } from "drizzle-orm/relations";
import { embeds, recipes, features } from "./schema";

export const recipesRelations = relations(recipes, ({one}) => ({
	embed: one(embeds, {
		fields: [recipes.post],
		references: [embeds.id]
	}),
}));

export const embedsRelations = relations(embeds, ({many}) => ({
	recipes: many(recipes),
	features: many(features),
}));

export const featuresRelations = relations(features, ({one}) => ({
	embed: one(embeds, {
		fields: [features.embed],
		references: [embeds.id]
	}),
}));