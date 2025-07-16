import { eq, gt, gte, isNull, and, sql, lte, isNotNull } from "drizzle-orm";

import db from "@/db";
import { features, recipes } from "@/db/schema";

export async function getOrCreateWeeklyFeature() {
  const nextWednesday = getNextWednesday();
  const lastWednesday = nextWednesday.getTime() - 7 * 24 * 60 * 60 * 1000;
  // Check if we already have a feature for this Wednesday
  const existingFeature = await db
    .select({
      recipe: recipes,
      featuredAt: features.featuredAt,
    })
    .from(features)
    .where(
      and(
        isNotNull(features.featuredAt),
        gt(features.featuredAt, lastWednesday),
        lte(features.featuredAt, nextWednesday.getTime())
      )
    )
    .innerJoin(recipes, eq(recipes.id, features.recipe))
    .get();

  if (existingFeature?.recipe) {
    return existingFeature;
  }

  // First try to get a random that has never been featured.
  let unfeaturedRecipe = await db
    .select({
      recipe: recipes,
    })
    .from(recipes)
    .leftJoin(features, eq(recipes.id, features.recipe))
    .where(isNull(features.featuredAt))
    .orderBy(sql`RANDOM()`)
    .get();

  if (!unfeaturedRecipe) {
    // get a random recipe that has been featured but is stale (older than 6 months)
    unfeaturedRecipe = await db
      .select({
        recipe: recipes,
      })
      .from(recipes)
      .leftJoin(features, eq(recipes.id, features.recipe))
      .where(lte(features.featuredAt, Date.now() - 60 * 60 * 24 * 180))
      .orderBy(sql`RANDOM()`)
      .get();
  }
  if (unfeaturedRecipe) {
    // Create the feature
    const { featuredAt } = await db
      .insert(features)
      .values({
        recipe: unfeaturedRecipe.recipe.id,
        featuredAt: nextWednesday.getTime(),
      })
      .returning()
      .get();

    return {
      recipe: unfeaturedRecipe.recipe,
      featuredAt,
    };
  }

  return null;
}

function getNextWednesday(): Date {
  const date = new Date();

  // Set to next Wednesday at 12:00 AM
  date.setDate(date.getDate() + ((3 - date.getDay() + 7) % 7 || 7));
  date.setHours(0, 0, 0, 0);

  // If today is Wednesday and it's before 12:00 AM, use today
  const today = new Date();
  if (date < today) {
    date.setDate(date.getDate() + 7);
  }

  return date;
}

// Helper function to get the current featured recipe
export async function getCurrentFeaturedRecipe() {
  const now = Date.now();
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;

  const data = await db
    .select({
      recipe: recipes,
      featuredAt: features.featuredAt,
    })
    .from(features)
    .innerJoin(recipes, eq(recipes.id, features.recipe))
    .where(
      and(isNotNull(features.featuredAt), gte(features.featuredAt, oneWeekAgo))
    )
    .get();

  if (!data || !data.recipe) {
    return null;
  }

  console.log(data.featuredAt, oneWeekAgo);
  return data;
}

export async function getRecipe(uuid: string) {
  return await db
    .select({
      recipe: recipes,
      featuredAt: features.featuredAt,
    })
    .from(features)
    .innerJoin(recipes, eq(recipes.id, features.recipe))
    .where(eq(recipes.uuid, uuid))
    .get();
}
