import { notFound } from "next/navigation";

import Feature from "@/components/Feature";
import { getOrCreateWeeklyFeature } from "@/db/features";
import { Metadata } from "next";
import { getFeaturedRecipeMetadata } from "./actions/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getOrCreateWeeklyFeature();

  return await getFeaturedRecipeMetadata(data?.recipe);
}

export default async function Home() {
  const data = await getOrCreateWeeklyFeature();

  if (!data) {
    return notFound();
  }

  const { recipe, featuredAt } = data;

  return <Feature recipe={recipe} featuredAt={featuredAt} />;
}
