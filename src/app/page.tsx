export const revalidate = 900;

import { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getCurrentFeaturedRecipe,
  getOrCreateWeeklyFeature,
  getOrCreateNextWeeklyFeature,
} from "@/actions/features";
import { getFeaturedRecipeMetadata } from "@/actions/metadata";

import Feature from "@/components/Feature";
import TeaserToaster from "@/components/TeaserToaster";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCurrentFeaturedRecipe();

  return await getFeaturedRecipeMetadata(data?.recipe);
}

export default async function Home() {
  const data = await getOrCreateWeeklyFeature();
  const nextFeature = await getOrCreateNextWeeklyFeature();
  if (!data) {
    return notFound();
  }

  const { recipe, featuredAt } = data;

  return (
    <>
      <Feature recipe={recipe} featuredAt={featuredAt} />
      <TeaserToaster recipe={nextFeature?.recipe} />
    </>
  );
}
