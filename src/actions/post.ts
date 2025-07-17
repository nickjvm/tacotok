"use server";

import db from "@/db";
import { recipes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cacheThumbnail } from "@/actions/tiktok";

export async function createPost(
  data: Omit<Recipe, "id" | "uuid" | "createdAt" | "updatedAt"> & {
    imageUrl: string;
  }
): Promise<Recipe> {
  const imageKey = await cacheThumbnail(data.imageUrl, data.embedUrl);

  return await db
    .insert(recipes)
    .values({
      uuid: crypto.randomUUID(),
      title: data.title,
      intro: data.intro,
      website: data.website,
      author: data.author,
      embedUrl: data.embedUrl,
      imageKey,
      ingredients: data.ingredients,
      instructions: data.instructions,
      hidden: data.hidden,
      createdAt: Date.now(),
    })
    .returning()
    .get();
}

export async function updatePost(
  data: Recipe & { imageUrl?: string }
): Promise<Recipe> {
  let imageKey = data.imageKey;
  if (data.imageUrl) {
    imageKey = await cacheThumbnail(data.imageUrl, data.embedUrl);
  }

  return await db
    .update(recipes)
    .set({
      title: data.title,
      intro: data.intro,
      website: data.website,
      author: data.author,
      embedUrl: data.embedUrl,
      imageKey,
      ingredients: data.ingredients,
      instructions: data.instructions,
      hidden: data.hidden,
      updatedAt: Date.now(),
    })
    .where(eq(recipes.uuid, data.uuid))
    .returning()
    .get();
}
