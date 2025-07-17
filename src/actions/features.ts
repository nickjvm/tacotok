import { eq, isNull, sql, lte, and } from "drizzle-orm";

import db from "@/db";
import { features, recipes } from "@/db/schema";

const yyyymmdd = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return parseInt(`${year}${month}${day}`, 10);
};

export async function getOrCreateWeeklyFeature() {
  const nextWednesday = getNextWednesday();

  const existingFeature = await getCurrentFeaturedRecipe();

  if (existingFeature?.featuredAt) {
    return existingFeature;
  }

  // First try to get a random that has never been featured.
  let unfeaturedRecipe = await db
    .select({
      recipe: recipes,
    })
    .from(recipes)
    .leftJoin(features, eq(recipes.id, features.recipe))
    .where(and(isNull(features.featuredAt), eq(recipes.hidden, 0)))
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
      .where(
        lte(
          features.featuredAt,
          yyyymmdd(new Date(Date.now() - 60 * 60 * 24 * 180))
        )
      )
      .orderBy(sql`RANDOM()`)
      .get();
  }

  if (unfeaturedRecipe) {
    // Create the feature
    const { featuredAt } = await db
      .insert(features)
      .values({
        recipe: unfeaturedRecipe.recipe.id,
        featuredAt: yyyymmdd(nextWednesday),
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
  date.setDate(date.getDate() + ((3 + 7 - date.getDay()) % 7 || 7));
  return date;
}

// Helper function to get the current featured recipe
export async function getCurrentFeaturedRecipe() {
  const data = await db
    .select({
      recipe: recipes,
      featuredAt: features.featuredAt,
    })
    .from(features)
    .innerJoin(recipes, eq(recipes.id, features.recipe))
    .where(eq(features.featuredAt, yyyymmdd(getNextWednesday())))
    .get();

  if (!data) {
    return null;
  }

  return data;
}

export async function getRecipe(uuid: string) {
  return await db
    .select({
      recipe: recipes,
      featuredAt: features.featuredAt,
    })
    .from(recipes)
    .leftJoin(features, eq(recipes.id, features.recipe))
    .where(eq(recipes.uuid, uuid))
    .get();
}
