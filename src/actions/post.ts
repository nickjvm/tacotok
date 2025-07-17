"use server";

import db from "@/db";
import { recipes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cacheThumbnail } from "@/actions/tiktok";

export async function createPost(
  data: Omit<Recipe, "id" | "uuid" | "createdAt" | "updatedAt">
): Promise<Recipe> {
  const imageUrl = await cacheThumbnail(data.imageUrl, data.embedUrl);

  return await db
    .insert(recipes)
    .values({
      uuid: crypto.randomUUID(),
      title: data.title,
      intro: data.intro,
      website: data.website,
      author: data.author,
      embedUrl: data.embedUrl,
      imageUrl,
      ingredients: data.ingredients,
      instructions: data.instructions,
      hidden: data.hidden,
      createdAt: Date.now(),
    })
    .returning()
    .get();
}

export async function updatePost(data: Recipe): Promise<Recipe> {
  let imageUrl = data.imageUrl;
  if (imageUrl.includes("tiktokcdn") || imageUrl.includes("cdninstagram")) {
    imageUrl = await cacheThumbnail(imageUrl, data.embedUrl);
  }

  return await db
    .update(recipes)
    .set({
      title: data.title,
      intro: data.intro,
      website: data.website,
      author: data.author,
      embedUrl: data.embedUrl,
      imageUrl,
      ingredients: data.ingredients,
      instructions: data.instructions,
      hidden: data.hidden,
      updatedAt: Date.now(),
    })
    .where(eq(recipes.uuid, data.uuid))
    .returning()
    .get();
}
