export const revalidate = 900;

import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getNextFeaturedRecipe } from "@/actions/features";
import { getFeaturedRecipeMetadata } from "@/actions/metadata";

import FeaturePreview from "@/components/FeaturePreview";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getNextFeaturedRecipe();

  return await getFeaturedRecipeMetadata(data?.recipe);
}

export default async function Home() {
  const data = await getNextFeaturedRecipe();

  if (!data) {
    return notFound();
  }

  const { recipe } = data;

  return (
    <>
      <FeaturePreview recipe={recipe} />
    </>
  );
}
