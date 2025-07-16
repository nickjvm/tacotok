"use server";

import db from "@/db";
import { recipes_new } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createPost(
  data: Omit<Recipe, "id" | "uuid" | "createdAt" | "updatedAt">
): Promise<Recipe> {
  return await db
    .insert(recipes_new)
    .values({
      uuid: crypto.randomUUID(),
      title: data.title,
      intro: data.intro,
      website: data.website,
      author: data.author,
      embedUrl: data.embedUrl,
      imageUrl: data.imageUrl,
      ingredients: data.ingredients,
      instructions: data.instructions,
      hidden: data.hidden,
      createdAt: Date.now(),
    })
    .returning()
    .get();
}

export async function updatePost(data: Recipe): Promise<Recipe> {
  return await db
    .update(recipes_new)
    .set({
      title: data.title,
      intro: data.intro,
      website: data.website,
      author: data.author,
      embedUrl: data.embedUrl,
      imageUrl: data.imageUrl,
      ingredients: data.ingredients,
      instructions: data.instructions,
      hidden: data.hidden,
      updatedAt: Date.now(),
    })
    .where(eq(recipes_new.uuid, data.uuid))
    .returning()
    .get();
}
