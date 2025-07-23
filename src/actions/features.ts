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
  const existingFeature = await getCurrentFeaturedRecipe();

  if (existingFeature) {
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
        and(
          eq(recipes.hidden, 0),
          lte(
            features.featuredAt,
            yyyymmdd(new Date(Date.now() - 60 * 60 * 24 * 180))
          )
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
        featuredAt: yyyymmdd(getNextWednesday()),
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

function isDstActive(timeZone: string) {
  const now = new Date();

  // Get the UTC offset in minutes for the given time zone
  const offsetNow = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short",
  })
    .formatToParts(now)
    .find((part) => part.type === "timeZoneName")?.value;

  // Get the offset for January (non-DST)
  const january = new Date(Date.UTC(now.getFullYear(), 0, 1));
  const offsetJan = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short",
  })
    .formatToParts(january)
    .find((part) => part.type === "timeZoneName")?.value;

  // If the current time zone name differs from January's, DST is active
  return offsetNow !== offsetJan;
}

function getNextWednesday(): Date {
  const date = new Date();
  const tzOffset = date.getTimezoneOffset() / 60;
  const mtOffset = isDstActive("America/Denver") ? 6 : 7;
  const offsetDiff = tzOffset - mtOffset;
  date.setHours(date.getHours() + offsetDiff);
  date.setDate(date.getDate() + ((3 + 7 - date.getDay()) % 7));
  return date;
}

// Helper function to get the current featured recipe
export async function getCurrentFeaturedRecipe() {
  return await db
    .select({
      recipe: recipes,
      featuredAt: features.featuredAt,
    })
    .from(features)
    .innerJoin(recipes, eq(recipes.id, features.recipe))
    .where(eq(features.featuredAt, yyyymmdd(getNextWednesday())))
    .get();
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
