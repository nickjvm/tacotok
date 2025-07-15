import { notFound } from "next/navigation";

import Feature from "@/components/Feature";
import { getRecipe } from "@/db/features";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await getRecipe(id);

  if (!data) {
    return notFound();
  }

  const { recipe, featuredAt } = data;

  return <Feature recipe={recipe} featuredAt={featuredAt} />;
}
