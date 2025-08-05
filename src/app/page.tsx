import { unstable_cache as cache } from "next/cache";

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

const getData = cache(
  async () => {
    const data = await getOrCreateWeeklyFeature();
    const nextFeature = await getOrCreateNextWeeklyFeature();
    return { data, nextFeature };
  },
  ["weekly-feature"],
  {
    revalidate: 60 * 60, // Revalidate every hour
    tags: ["weekly-feature"],
  }
);

export default async function Home() {
  const { data, nextFeature } = await getData();

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
