import { relations } from "drizzle-orm/relations";
import { recipes, features } from "./schema";

export const featuresRelations = relations(features, ({one}) => ({
	recipe: one(recipes, {
		fields: [features.recipe],
		references: [recipes.id]
	}),
}));

export const recipesRelations = relations(recipes, ({many}) => ({
	features: many(features),
}));