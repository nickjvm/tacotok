import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getFeaturedRecipeMetadata } from "@/actions/metadata";
import Feature from "@/components/Feature";
import { getRecipe } from "@/actions/features";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getRecipe(id);

  return await getFeaturedRecipeMetadata(data?.recipe);
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await getRecipe(id);

  if (!data || (!process.env.ADMIN_TOKEN && data.recipe.hidden)) {
    return notFound();
  }

  const { recipe, featuredAt } = data;

  return <Feature recipe={recipe} featuredAt={featuredAt} />;
}
